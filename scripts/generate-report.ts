import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { Octokit } from "@octokit/rest";
import type { ConfigFile } from '../src/lib/types';

const REPORTS_DIR = "./reports";
const SITES_YAML = "./data/sites.yaml";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type AggregateReport = {
  period: "weekly" | "monthly";
  periodStart: string;
  periodEnd: string;
  totalChecks: number;
  upCount: number;
  downCount: number;
  uptimePct: number;
  lastUpdated: string;
  name: string;
  url: string;
}

async function run() {
  const mode = (process.argv[2] || "weekly").toLowerCase() as "weekly" | "monthly";
  const repoFull = process.env.GITHUB_REPOSITORY ?? "";
  const token = process.env.GITHUB_TOKEN ?? process.env.PERSONAL_TOKEN;
  const octokit = token ? new Octokit({ auth: token }) : null;

  const cfgTxt = await fs.readFile(SITES_YAML, "utf8");
  const cfg = yaml.load(cfgTxt) as ConfigFile;
  if (!cfg || !cfg.sites) throw new Error("No sites.yaml found");

  const rows: Array<{ name: string; url: string; uptimePct: number; total: number; downtime: number; }> = [];
  for (const site of cfg.sites) {
    const siteDir = path.posix.join(REPORTS_DIR, slugify(site.name || site.url));
    const aggPath = path.posix.join(siteDir, `${mode}.json`);
    try {
      const txt = await fs.readFile(aggPath, "utf8");
      const agg = JSON.parse(txt) as AggregateReport;
      rows.push({
        name: site.name,
        url: site.url,
        uptimePct: agg.uptimePct ?? 0,
        total: agg.totalChecks ?? 0,
        downtime: agg.downCount ?? 0
      });
    } catch {
      rows.push({ name: site.name, url: site.url, uptimePct: 0, total: 0, downtime: 0 });
    }
  }

  // compose markdown (single stable filename per mode)
  const now = new Date();
  const header = `# ${mode[0].toUpperCase() + mode.slice(1)} Uptime Report`;
  const tableHeader = ["| Site | Uptime % | Checks | Downtime |", "| ---- | -------: | -----: | ------: |"];
  const tableRows = rows.map(s => `| [${s.name}](${s.url}) | ${s.uptimePct}% | ${s.total} | ${s.downtime} |`);
  const body = [
    header,
    "",
    ...tableHeader,
    ...tableRows,
    "",
    `Generated: ${now.toISOString()}`
  ].join("\n");

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  const outPath = path.posix.join(REPORTS_DIR, `${mode}.md`);
  await fs.writeFile(outPath, body, "utf8");
  console.log("Updated", outPath);

  if (octokit && repoFull) {
    const [owner, repo] = repoFull.split("/");
    const title = `${mode[0].toUpperCase()+mode.slice(1)} Uptime Report — ${now.toISOString().split("T")[0]}`;
    const bodyText = body;
    try {
      await octokit.issues.create({ owner, repo, title, body: bodyText, labels: ["report"] });
      console.log("Created report issue");
    } catch (e) {
      console.log("Skipping issue creation:", String(e));
    }
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
