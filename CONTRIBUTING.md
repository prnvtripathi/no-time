# Contributing

Thanks for your interest in contributing! This project includes a Svelte app and an automated website uptime checker with scheduled reports.

- For app development, see the setup and run instructions in `README.md`.
- For automation, reporting, and CI details, read the sections below.

## Uptime reports and automation

This repo also contains an automated website uptime checker and report generator. Key details:

- All report artifacts live on the `reports` branch, not `main`.
- Files are organized per website under `reports/<site>/` with three stable files:
	- `latest.json` – last check result for that website
	- `weekly.json` – rolling ISO-week aggregate with fields: `totalChecks`, `upCount`, `downCount`, `uptimePct`, `periodStart`, `periodEnd`
	- `monthly.json` – rolling calendar-month aggregate with the same fields
- Top-level summaries are written to:
	- `reports/weekly.md`
	- `reports/monthly.md`

The web app reads from the `reports` branch via GitHub Raw and expects:

- `data/sites.yaml` – list of sites to monitor
- `reports/latest.json` – a convenience file containing the most recent check results across all sites

### Workflows

- Website checks run every 5 minutes (see `.github/workflows/check-uptime.yaml`). Each run updates the per-site `latest.json`, `weekly.json`, and `monthly.json` files in the `reports` branch. No timestamped files are created.
- Weekly and monthly summary jobs (see the `weekly-report.yaml` and `monthly-report.yaml` workflows) generate/update single, stable markdown files in `reports/` and also create a GitHub Issue with the summary.

### Running locally

Prereqs: Node 20+, `npm i`.

Run a one-off uptime check (updates `./reports` in your working tree):

```sh
node --loader ts-node/esm scripts/check-uptime.ts
```

Generate summaries (writes/updates `./reports/weekly.md` or `./reports/monthly.md`):

```sh
node --loader ts-node/esm scripts/generate-report.ts weekly
node --loader ts-node/esm scripts/generate-report.ts monthly
```

To publish to the `reports` branch manually, commit the `reports/` and `data/sites.yaml` changes on that branch and push.
