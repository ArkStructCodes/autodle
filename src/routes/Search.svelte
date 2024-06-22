<script lang="ts">
	import type { SearchEntry } from '$lib/types';

	import Modal from '$lib/components/Modal.svelte';

	export let entries: SearchEntry[];
	export let selected: SearchEntry | null = null;

	let input = '';
	let modal: HTMLDialogElement;

	export function show() {
		modal.showModal();
	}

	function* filterEntries(keyword: string) {
		if (keyword === '') {
			return;
		}

		for (const entry of entries) {
			if (entry.label.toLowerCase().includes(keyword.toLowerCase())) {
				yield entry;
			}
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
					<button on:click={() => handleSelection(entry)}>{entry.label}</button>
				</li>
			{:else}
				<span class="py-4 text-neutral-content text-lg text-center">
					<p>No matches found</p>
				</span>
			{/each}
		</ul>
	</div>
</Modal>
