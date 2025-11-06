<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import Button from "$lib/components/ui/button/button.svelte";
	import { invalidateAll } from "$app/navigation";

	let open = false;
	let name = "";
	let url = "";
	let owner = "";

	async function handleSubmit(e: Event) {
		e.preventDefault();
		try {
			const res = await fetch("/api/create-site-pr", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, url, owner }),
			});
			const data = await res.json();
			alert(data.message);
			if (res.ok) {
				// refresh data on the page and close the dialog
				await invalidateAll();
				open = false;
				name = "";
				url = "";
				owner = "";
			}
		} catch (err) {
			console.error(err);
			alert("An error occurred while creating the PR.");
		}
	}
</script>

<Dialog.Root bind:open>
	<!-- Use the existing Button as the trigger (asChild so Button becomes the trigger element) -->
		<Dialog.Trigger {...({ asChild: true } as any)}>
			<Button variant="default" class="m-0">Add New Site</Button>
		</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay />
		<Dialog.Content>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<Dialog.Title class="text-lg font-semibold">Add a New Website</Dialog.Title>
				</div>

				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
					<div class="space-y-1">
						<label for="site-name" class="block text-sm font-medium">Name</label>
						<input
							id="site-name"
							bind:value={name}
							class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
							required
						/>
					</div>

					<div class="space-y-1">
						<label for="site-url" class="block text-sm font-medium">URL</label>
						<input
							id="site-url"
							bind:value={url}
							type="url"
							class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
							required
						/>
					</div>

					<div class="space-y-1">
						<label for="site-owner" class="block text-sm font-medium">GitHub Username</label>
						<input
							id="site-owner"
							bind:value={owner}
							class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
							required
						/>
					</div>

					<div>
						<button
							type="submit"
							disabled={!name.trim() || !url.trim() || !owner.trim()}
							class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-full font-semibold disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
						>
							Create Pull Request
						</button>
					</div>
				</form>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>