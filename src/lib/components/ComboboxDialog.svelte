<script lang="ts">
	import type { ComboboxEntry, Nullable } from '$lib/types';
	import { hideDialog } from '$lib/utils';

	import Dialog from '$lib/components/Dialog.svelte';

	export let id: string;
	export let entries: ComboboxEntry[];
	export let selected: Nullable<ComboboxEntry> = null;

	let input: string = '';

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

	function handleSelection(entry: ComboboxEntry) {
		hideDialog(id);
		selected = entry;
	}

	// TODO: keyboard navigation
</script>

<Dialog {id}>
	<input
		type="text"
		name={`input-${id}`}
		placeholder="Enter your guess"
		bind:value={input}
		class="input w-full mb-4"
	/>
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
</Dialog>
