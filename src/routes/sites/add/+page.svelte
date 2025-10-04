<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	let name = '';
	let url = '';
	let owner = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const res = await fetch('/api/create-site-pr', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, url, owner })
		});
		const data = await res.json();
		alert(data.message);
		if (res.ok) await invalidateAll();
	}
</script>

<main class="p-8 bg-gray-100 min-h-screen">
	<h1 class="text-2xl font-bold mb-6">+ Add a New Website</h1>
	<form on:submit={handleSubmit} class="max-w-lg bg-white p-6 rounded-xl shadow space-y-4">
		<div>
			<label for="site-name" class="block font-semibold mb-1">Name</label>
			<input id="site-name" bind:value={name} class="w-full border rounded p-2" required />
		</div>
		<div>
			<label for="site-url" class="block font-semibold mb-1">URL</label>
			<input id="site-url" bind:value={url} type="url" class="w-full border rounded p-2" required />
		</div>
		<div>
			<label for="site-owner" class="block font-semibold mb-1">GitHub Username</label>
			<input id="site-owner" bind:value={owner} class="w-full border rounded p-2" required />
		</div>
		<button
			type="submit"
			class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full font-semibold">
			Create Pull Request
		</button>
	</form>
</main>
