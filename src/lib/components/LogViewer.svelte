<script lang="ts">
  import type { Log } from "$lib/types";
  export let logs: Log[] = [];
</script>

<table class="min-w-full mt-4 text-sm border border-border rounded-md overflow-hidden bg-card text-card-foreground">
  <thead>
    <tr class="text-left bg-muted/40">
      <th class="py-2 px-3 font-medium">Site</th>
      <th class="py-2 px-3 font-medium">Status</th>
      <th class="py-2 px-3 font-medium">Code</th>
      <th class="py-2 px-3 font-medium">RTT (ms)</th>
      <th class="py-2 px-3 font-medium">Checked</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-border">
    {#each logs as log}
      <tr class="hover:bg-muted/30 transition-colors">
        <td class="py-2 px-3">{log.name}</td>
        <td class={"py-2 px-3 font-medium " + (log.status === "UP" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
          {log.status}
        </td>
        <td class="py-2 px-3 tabular-nums">{log.code}</td>
        <td class="py-2 px-3 tabular-nums">{log.rtt}</td>
        <td class="py-2 px-3 whitespace-nowrap">{new Date(log.checkedAt).toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>
