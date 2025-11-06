<script lang="ts">
  import { onMount } from "svelte";
  import { RAW_BASE } from "$lib/config";
  import SiteCard from "$lib/components/SiteCard.svelte";
  import LogViewer from "$lib/components/LogViewer.svelte";
  import AddNewSite from "$lib/components/AddNewSite.svelte";
  import type { Site, Log } from "$lib/types";
  import ModeToggle from "$lib/components/ui/mode-toggle.svelte";
  import GithubButton from "$lib/components/ui/github-button.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  let sites: Site[] = [];
  let logs: Log[] = [];

  onMount(async () => {
    const yaml = await (await import("js-yaml")).default;
    const siteRes = await fetch(`${RAW_BASE}/data/sites.yaml`);
    const siteData = yaml.load(await siteRes.text()) as { sites: Site[] };
    sites = siteData.sites;
    const logRes = await fetch(`${RAW_BASE}/logs/latest.json`);
    logs = (await logRes.json()) as Log[];
  });
</script>

<main class="p-8 min-h-screen bg-background text-foreground transition-colors">
  <header class="flex justify-between items-center mb-6">
    <div>
      <h1 class="text-3xl font-bold">🌐 No Time</h1>
      <p class="text-muted-foreground">Monitor and Report Website Uptime</p>
    </div>
    <div class="flex items-center gap-1">
      <AddNewSite />
      <GithubButton />
      <ModeToggle />
    </div>
  </header>

  <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each sites as site}
      <SiteCard {site} log={logs.find((l) => l.url === site.url)} />
    {/each}
  </section>

  <section class="mt-10">
    <h2 class="text-xl font-semibold mb-3">Recent Uptime Logs</h2>
    <LogViewer {logs} />
  </section>
</main>
