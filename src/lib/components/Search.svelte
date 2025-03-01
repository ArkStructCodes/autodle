<script lang="ts">
  import uFuzzy from "@leeoniya/ufuzzy";

  import Modal from "./base/Modal.svelte";

  export interface SearchResult {
    item: string;
    index: number;
    html: string;
  }

  interface Props {
    items: string[];
    placeholder?: string;
    selected?: SearchResult;
  }

  let { items, placeholder, selected = $bindable() }: Props = $props();

  const ufuzzy = new uFuzzy();
  let keyword = $state("");

  function highlighter(text: string, matched: boolean): string {
    return matched ? `<b class="text-secondary">${text}</b>` : text;
  }

  function* search(keyword: string): Generator<SearchResult> {
    if (!keyword) {
      return;
    }

    const [_, info, order] = ufuzzy.search(items, keyword);
    if (!info) {
      return;
    }

    for (let i = 0; i < order.length; i++) {
      const infoIndex = order[i];
      const itemIndex = info.idx[infoIndex];
      const item = items[itemIndex];

      yield {
        item,
        index: itemIndex,
        html: uFuzzy.highlight(item, info.ranges[infoIndex], highlighter),
      };
    }
  }

  // svelte-ignore non_reactive_update
  let dialog: HTMLDialogElement;
  let input: HTMLInputElement;

  export function show() {
    setTimeout(() => input.focus(), 50);
    dialog.showModal();
  }
</script>

<Modal bind:dialog position="top" id="search">
  <input
    bind:this={input}
    type="text"
    name="search"
    {placeholder}
    bind:value={keyword}
    class="input w-full p-3 text-lg placeholder:opacity-60"
  />
  <div class="scroll-indicator mt-6 max-h-96 overflow-y-auto">
    <ul class="menu menu-lg w-full">
      {#each search(keyword) as result}
        <li>
          <button
            onclick={() => {
              selected = result;
              keyword = "";
              dialog.close();
            }}
            class="px-2 py-3"
          >
            <span>{@html result.html}</span>
          </button>
        </li>
      {:else}
        <li class="text-center opacity-60">
          {#if keyword}
            Click outside or press ESC to close
          {:else}
            No results found
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</Modal>
