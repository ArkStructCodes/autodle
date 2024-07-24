<script lang="ts">
	import type { SearchEntry } from '$lib/types';
	import uFuzzy from '@leeoniya/ufuzzy';

	import Modal from '$lib/components/Modal.svelte';

	export let entries: string[];
	export let selected: SearchEntry | undefined = undefined;

	let input = '';
	let uf = new uFuzzy();

	let modal: HTMLDialogElement;

	export function show() {
		modal.showModal();
	}

	function markAsBold(part: string, matched: boolean) {
		return matched ? `<b>${part}</b>` : part;
	}

	function* filterEntries(keyword: string) {
		if (keyword === '') {
			return;
		}

		const [_, info, order] = uf.search(entries, keyword);

		for (let i = 0; i < order?.length!; i++) {
			const infoIdx = order![i];
			const entry = entries[info?.idx[infoIdx]!];

			yield {
				index: infoIdx,
				label: entry,
				html: uFuzzy.highlight(entry, info?.ranges[infoIdx]!, markAsBold)
			};
		}
	}

	function handleSelection(entry: SearchEntry) {
		selected = entry;
		modal.close();
	}
</script>

<Modal bind:modal on:close={() => (input = '')} id="search" centered={false}>
	<input
		type="text"
		name="search-input"
		placeholder="Type your guess"
		bind:value={input}
		class="input mb-4 w-full"
	/>
	<!-- TODO: keyboard navigation -->
	<div class="max-h-96 overflow-auto">
		<ul class="menu menu-lg">
			{#each filterEntries(input) as entry}
				<li>
					<button on:click={() => handleSelection(entry)}>
						<p>{@html entry.html}</p>
					</button>
				</li>
			{:else}
				<li class="py-4 text-neutral-content text-lg text-center">No matches found</li>
			{/each}
		</ul>
	</div>
</Modal>
