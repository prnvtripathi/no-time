<script>
  export let site;
  export let log;
</script>

<div class="card p-3 border rounded bg-card text-card-foreground shadow-sm transition-colors">
  <div class="flex items-center justify-between">
    <div>
      <a href={site.url} target="_blank" rel="noreferrer">
        <h3 class="text-lg font-semibold">{site.name}</h3>
      </a>
      <div class="text-sm text-muted-foreground">{site.url}</div>
    </div>
    <div class="text-right">
      {#if log}
        <div class={"font-bold " + (log.status === "UP" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
          {log.status}
        </div>
        <div class="text-xs">{log.code ?? ""} · {log.rtt ?? "-"}ms</div>
      {:else}
        <div class="text-sm text-muted-foreground">no data</div>
      {/if}
    </div>
  </div>
</div>
