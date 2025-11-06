import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { Octokit } from "@octokit/rest";
import type { ConfigFile, Site, UptimeResult } from '../src/lib/types';

// New layout: per-site folders under ./reports
const REPORTS_DIR = "./reports";
const SITES_YAML = "./data/sites.yaml";

async function safeReadYaml(p: string) {
  const txt = await fs.readFile(p, "utf8");
  return yaml.load(txt);
}

async function fetchWithTimeout(url: string, timeout = 8000, method = "GET") {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const start = Date.now();
    const res = await fetch(url, { method, signal: controller.signal });
    const elapsed = Date.now() - start;
    clearTimeout(id);
    return { ok: res.ok, status: res.status, elapsed };
  } catch (err: any) {
    clearTimeout(id);
    return { ok: false, status: 0, elapsed: 0, error: err.message || String(err) };
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function startOfIsoWeekUTC(d = new Date()) {
  const day = d.getUTCDay(); // 0 = Sun, 1 = Mon
  const diffToMonday = (day === 0 ? -6 : 1) - day; // move back to Monday
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
  start.setUTCDate(start.getUTCDate() + diffToMonday);
  return start;
}

function endOfIsoWeekUTC(d = new Date()) {
  const start = startOfIsoWeekUTC(d);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  return end;
}

function startOfMonthUTC(d = new Date()) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
}

function endOfMonthUTC(d = new Date()) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1, 0, 0, 0, 0));
}

type AggregateReport = {
  period: "weekly" | "monthly";
  periodStart: string; // ISO
  periodEnd: string;   // ISO (exclusive)
  totalChecks: number;
  upCount: number;
  downCount: number;
  uptimePct: number; // 0..100
  lastUpdated: string; // ISO
  name: string;
  url: string;
};

async function ensureReportsDir() {
  await fs.mkdir(REPORTS_DIR, { recursive: true });
}

async function ensureSiteDir(site: Site) {
  const dir = path.posix.join(REPORTS_DIR, slugify(site.name || site.url));
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

function computePeriod(period: "weekly" | "monthly", now = new Date()) {
  if (period === "weekly") {
    return { start: startOfIsoWeekUTC(now), end: endOfIsoWeekUTC(now) };
  }
  return { start: startOfMonthUTC(now), end: endOfMonthUTC(now) };
}

async function updateAggregate(filePath: string, period: "weekly" | "monthly", site: Site, status: "UP" | "DOWN", now = new Date()) {
  const { start, end } = computePeriod(period, now);
  const empty: AggregateReport = {
    period,
    periodStart: start.toISOString(),
    periodEnd: end.toISOString(),
    totalChecks: 0,
    upCount: 0,
    downCount: 0,
    uptimePct: 0,
    lastUpdated: now.toISOString(),
    name: site.name,
    url: site.url
  };

  let current: AggregateReport = empty;
  try {
    const txt = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(txt) as AggregateReport;
    // rollover if period changed
    if (parsed.periodStart !== empty.periodStart || parsed.periodEnd !== empty.periodEnd) {
      current = empty;
    } else {
      current = parsed;
    }
  } catch {
    // no existing file — start fresh
    current = empty;
  }

  current.totalChecks += 1;
  if (status === "UP") current.upCount += 1; else current.downCount += 1;
  current.uptimePct = current.totalChecks === 0 ? 0 : Math.round((current.upCount / current.totalChecks) * 10000) / 100;
  current.lastUpdated = now.toISOString();

  await fs.writeFile(filePath, JSON.stringify(current, null, 2), "utf8");
}

async function createIssueIfNeeded(octokit: Octokit | null, ownerRepo: string, site: Site, checkResult: UptimeResult) {
  const [owner, repo] = ownerRepo.split("/");
  if (!octokit) return; // nothing to do if not authenticated

  // look for open issues labeled 'incident'
  const { data: openIssues } = await octokit.issues.listForRepo({
    owner, repo,
    state: "open",
    labels: "incident",
    per_page: 100
  });

  const already = openIssues.some(i => (i.title && i.title.includes(site.url)) || (i.body && i.body.includes(site.url)));
  if (already) {
    return null;
  }

  const mention = site.owner ? (site.owner.startsWith("@") ? site.owner : `@${site.owner}`) : "";
  const title = `🚨 [DOWN] ${site.name} — ${site.url}`;
  const body = `${mention}

**Detected downtime**
- Site: ${site.name} — ${site.url}
- Checked at: ${new Date().toISOString()}
- HTTP status: ${checkResult.status}
- Error: ${checkResult.error ?? "none"}
- RTT: ${checkResult.elapsed} ms

Please investigate.`;

  const created = await octokit.issues.create({
    owner, repo, title, body, labels: ["incident"]
  });

  return created.data;
}

async function run() {
  const repoFull = process.env.GITHUB_REPOSITORY ?? "";
  const token = process.env.GITHUB_TOKEN ?? process.env.PERSONAL_TOKEN;

  const octokit = token ? new Octokit({ auth: token }) : null;

  const cfg = await safeReadYaml(SITES_YAML) as ConfigFile;
  if (!cfg || !cfg.sites) {
    console.error("No sites configured in data/sites.yaml");
    process.exit(1);
  }

  await ensureReportsDir();

  const results = [];
  for (const site of cfg.sites) {
    const timeout = site.timeoutMS ?? 8000;
    const method = site.checkMethod ?? "GET";
    const res = await fetchWithTimeout(site.url, timeout, method);
    const statusText = res.ok ? "UP" : "DOWN";

    const record: UptimeResult = {
      name: site.name,
      url: site.url,
      owner: site.owner || null,
      status: statusText as "UP" | "DOWN",
      code: res.status,
      error: res.error ?? null,
      rtt: res.elapsed ?? null,
      checkedAt: new Date().toISOString()
    };

    console.log(`[${record.checkedAt}] ${site.name} -> ${record.status} (${record.code})`);
    results.push(record);

    if (record.status === "DOWN" && octokit && repoFull) {
      try {
        await createIssueIfNeeded(octokit, repoFull, site, record);
      } catch (err) {
        console.error("Issue creation failed", err);
      }
    }

    // Write per-site reports: latest.json, weekly.json, monthly.json
    const siteDir = await ensureSiteDir(site);
    const latestPath = path.posix.join(siteDir, "latest.json");
    await fs.writeFile(latestPath, JSON.stringify(record, null, 2), "utf8");

    await updateAggregate(path.posix.join(siteDir, "weekly.json"), "weekly", site, record.status);
    await updateAggregate(path.posix.join(siteDir, "monthly.json"), "monthly", site, record.status);
  }

  // also maintain a global latest.json for convenience (optional)
  const globalLatestPath = path.posix.join(REPORTS_DIR, "latest.json");
  await fs.writeFile(globalLatestPath, JSON.stringify(results, null, 2), "utf8");

  console.log("Updated per-site reports in", REPORTS_DIR);
}

run().catch(err => {
  console.error(err);
  process.exit(2);
});
