<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import ModeToggle from "$lib/components/ui/mode-toggle.svelte";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  let name = $state("");
  let url = $state("");
  let owner = $state("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const res = await fetch("/api/create-site-pr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url, owner }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) await invalidateAll();
  }
</script>

<main class="p-8 min-h-screen bg-background text-foreground transition-colors space-y-6">
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2 space-x-2">
      <Button href="/" variant="outline" size="icon">
        <ArrowLeft class="h-4 w-4" />
        <span class="sr-only">Go Back</span>
      </Button>
      <h1 class="text-2xl font-bold">Add a New Website</h1>
    </div>
	<ModeToggle />
  </div>
  <form
    onsubmit={handleSubmit}
    class="max-w-lg bg-card text-card-foreground p-6 rounded-xl border shadow space-y-4"
  >
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
      <label for="site-owner" class="block text-sm font-medium"
        >GitHub Username</label
      >
      <input
        id="site-owner"
        bind:value={owner}
        class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
        required
      />
    </div>
    <button
      type="submit"
      disabled={!name.trim() || !url.trim() || !owner.trim()}
      class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-full font-semibold disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
    >
      Create Pull Request
    </button>
  </form>
</main>
