<script>
  export let site;
  export let log;
</script>

<div class="card p-3 border rounded">
  <div class="flex items-center justify-between">
    <div>
      <a href={site.url} target="_blank" rel="noreferrer">
        <h3 class="text-lg font-semibold">{site.name}</h3>
      </a>
      <div class="text-sm text-muted">{site.url}</div>
    </div>
    <div class="text-right">
      {#if log}
        <div class={"font-bold " + (log.status === "UP" ? "text-green-600" : "text-red-600")}>
          {log.status}
        </div>
        <div class="text-xs">{log.code ?? ""} · {log.rtt ?? "-"}ms</div>
      {:else}
        <div class="text-sm text-gray-500">no data</div>
      {/if}
    </div>
  </div>
</div>
