<script lang="ts">
  interface Props {
    limit: number;
    remaining: number;
  }

  let { limit, remaining }: Props = $props();

  let segmentSize = $derived(Math.trunc(limit / 3));
  let segment = $derived(Math.min(segmentSize, Math.ceil(remaining / segmentSize)));
</script>

{#snippet dot(remaining: number, position: number)}
  {@const colorable = remaining > position}
  <span
    class="size-4 rounded-full transition transition-colors"
    class:bg-base-300={!colorable}
    class:bg-rose-500={colorable && segment === 1}
    class:bg-amber-500={colorable && segment === 2}
    class:bg-emerald-500={colorable && segment === 3}
  ></span>
{/snippet}

{#key remaining}
  <div class="m-4 flex w-60 items-center justify-around gap-2">
    {#each { length: limit }, position}
      {@render dot(remaining, position)}
    {/each}
  </div>
{/key}
