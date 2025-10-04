<script lang="ts">
  import type { Log } from "$lib/types";
  export let logs: Log[] = [];
</script>

<table class="min-w-full mt-4">
  <thead>
    <tr class="text-left">
      <th>Site</th>
      <th>Status</th>
      <th>Code</th>
      <th>RTT (ms)</th>
      <th>Checked</th>
    </tr>
  </thead>
  <tbody>
    {#each logs as log}
      <tr>
        <td>{log.name}</td>
        <td class={log.status === "UP" ? "text-green-600" : "text-red-600"}
          >{log.status}</td
        >
        <td>{log.code}</td>
        <td>{log.rtt}</td>
        <td>{new Date(log.checkedAt).toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>
