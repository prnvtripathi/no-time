import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { Octokit } from "@octokit/rest";
import type { ConfigFile, Site, UptimeResult } from '../src/lib/types';

const LOG_DIR = "./logs";
const SITES_YAML = "./data/sites.yaml";

function isoNowFileName() {
  return new Date().toISOString().replace(/:/g, "-").split(".")[0];
}

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

async function ensureLogDir() {
  await fs.mkdir(LOG_DIR, { recursive: true });
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

  await ensureLogDir();

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
  }

  const fname = path.posix.join(LOG_DIR, `${isoNowFileName()}.json`);
  await fs.writeFile(fname, JSON.stringify(results, null, 2), "utf8");

  // also maintain latest.json to simplify UI fetch
  const latestPath = path.posix.join(LOG_DIR, "latest.json");
  await fs.writeFile(latestPath, JSON.stringify(results, null, 2), "utf8");

  console.log("Wrote logs:", fname);
}

run().catch(err => {
  console.error(err);
  process.exit(2);
});
