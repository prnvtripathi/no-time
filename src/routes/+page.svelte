<script lang="ts">
	import { onMount } from 'svelte';
	import { RAW_BASE } from '$lib/config';
	import SiteCard from '$lib/components/SiteCard.svelte';
	import LogViewer from '$lib/components/LogViewer.svelte';
	import { goto } from '$app/navigation';
	import type { Site, Log } from '$lib/types';

	let sites: Site[] = [];
	let logs: Log[] = [];

	onMount(async () => {
		const yaml = await (await import('js-yaml')).default;
		const siteRes = await fetch(`${RAW_BASE}/data/sites.yaml`);
		const siteData = yaml.load(await siteRes.text()) as { sites: Site[] };
		sites = siteData.sites;
		const logRes = await fetch(`${RAW_BASE}/logs/latest.json`);
		logs = (await logRes.json()) as Log[];
	});
</script>

<main class="p-8 bg-gray-50 min-h-screen">
	<header class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold text-gray-800">🌐 Website Health Dashboard</h1>
		<button
			on:click={() => goto('/sites/add')}
			class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
			+ Add New Site
		</button>
	</header>

	<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each sites as site}
			<SiteCard {site} log={logs.find(l => l.url === site.url)} />
		{/each}
	</section>

	<section class="mt-10">
		<h2 class="text-xl font-semibold mb-3">Recent Uptime Logs</h2>
		<LogViewer {logs} />
	</section>
</main>
