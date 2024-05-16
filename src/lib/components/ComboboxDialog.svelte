<script lang="ts" context="module">
	let modal: HTMLDialogElement;

	export function show() {
		modal.showModal();
	}

	export function hide() {
		modal.close();
	}
</script>

<script lang="ts">
	import type { ComboboxEntry } from '$lib/types';

	export let id: string;
	export let entries: ComboboxEntry[];
	export let selected: ComboboxEntry | null = null;

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
		hide();
		selected = entry;
	}
</script>

<dialog {id} bind:this={modal} on:close={() => (input = '')} class="modal modal-top">
	<div class="modal-box mx-auto lg:w-1/2">
		<input
			type="text"
			name={`input-${id}`}
			placeholder="Enter your guess"
			bind:value={input}
			class="input w-full mb-4"
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
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
