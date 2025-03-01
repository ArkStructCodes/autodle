<script lang="ts">
  import { fly } from "svelte/transition";

  import type { SearchResult } from "$lib/components/Search.svelte";

  interface Props {
    selected?: SearchResult;
    hintAvailable: boolean;
    search: () => void;
    guess: () => void;
    hint: () => void;
  }

  let { selected, hintAvailable, search, guess, hint }: Props = $props();
</script>

<div class="join">
  <button onclick={search} class="btn join-item w-44">
    <span class="truncate">
      {selected?.item ?? "Select Car"}
    </span>
  </button>
  <button onclick={guess} disabled={!selected} class="btn btn-primary join-item">
    Guess
  </button>
  {#if hintAvailable}
    <button
      onclick={hint}
      transition:fly={{ x: "100%" }}
      class="btn btn-secondary join-item"
    >
      Hint
    </button>
  {/if}
</div>
