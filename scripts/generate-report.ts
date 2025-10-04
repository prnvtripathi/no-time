// scripts/generate-report.js
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { Octokit } from "@octokit/rest";
import type { ConfigFile, Site, UptimeResult } from '../src/lib/types';

const LOG_DIR = "./logs";
const SITES_YAML = "./data/sites.yaml";

function daysAgoDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

async function loadJsonFiles() {
  const files = await fs.readdir(LOG_DIR);
  return Promise.all(files.filter(f => f.endsWith(".json")).map(async (f) => {
    const full = path.join(LOG_DIR, f);
    const txt = await fs.readFile(full, "utf8");
    return JSON.parse(txt);
  }));
}

async function run() {
  const mode = (process.argv[2] || "weekly").toLowerCase(); // 'weekly' or 'monthly'
  const days = mode === "monthly" ? 30 : 7;
  const repoFull = process.env.GITHUB_REPOSITORY ?? "";
  const token = process.env.GITHUB_TOKEN ?? process.env.PERSONAL_TOKEN;
  const octokit = token ? new Octokit({ auth: token }) : null;

  const cfgTxt = await fs.readFile(SITES_YAML, "utf8");
  const cfg = yaml.load(cfgTxt) as ConfigFile;
  if (!cfg || !cfg.sites) throw new Error("No sites.yaml found");

  // collect all log records from files
  const files = await fs.readdir(LOG_DIR);
  const cutoff = daysAgoDate(days);
  const records = [];
  for (const f of files.filter(x => x.endsWith(".json"))) {
    const txt = await fs.readFile(path.join(LOG_DIR, f), "utf8");
    try {
      const arr = JSON.parse(txt);
      for (const r of arr) {
        const t = new Date(r.checkedAt);
        if (t >= cutoff) records.push(r);
      }
    } catch (e) {
      // skip
    }
  }

  // compute uptime per site
  const summary = [];
  for (const site of cfg.sites) {
    const siteRecs = records.filter(r => r.url === site.url);
    const total = siteRecs.length;
    const up = siteRecs.filter(r => r.status === "UP").length;
    const uptimePct = total === 0 ? 0 : Math.round((up / total) * 10000) / 100;
    summary.push({ name: site.name, url: site.url, total, up, downtime: total - up, uptimePct });
  }

  // compose markdown
  const now = new Date();
  const summaryMD = [
    `# ${mode[0].toUpperCase() + mode.slice(1)} Uptime Report`,
    `**Period:** last ${days} days (${cutoff.toISOString().split("T")[0]} → ${now.toISOString().split("T")[0]})`,
    "",
    "| Site | Uptime % | Checks | Downtime |",
    "| ---- | -------: | -----: | ------: |",
    ...summary.map(s => `| [${s.name}](${s.url}) | ${s.uptimePct}% | ${s.total} | ${s.downtime} |`),
    "",
    `Generated: ${now.toISOString()}`
  ].join("\n");

  await fs.mkdir(LOG_DIR, { recursive: true });
  const fname = path.join(LOG_DIR, `${mode}-summary-${now.toISOString().split("T")[0]}.md`);
  await fs.writeFile(fname, summaryMD, "utf8");
  await fs.writeFile(path.join(LOG_DIR, `${mode}-summary-latest.md`), summaryMD, "utf8");

  console.log("Wrote", fname);

  if (octokit && repoFull) {
    const [owner, repo] = repoFull.split("/");
    const title = `${mode[0].toUpperCase()+mode.slice(1)} Uptime Report — ${now.toISOString().split("T")[0]}`;
    const body = summaryMD;

    await octokit.issues.create({
      owner, repo, title, body, labels: ["report"]
    });

    console.log("Created report issue");
  } else {
    console.log("No GitHub token found; skipping issue creation.");
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
