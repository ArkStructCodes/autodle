<script lang="ts">
	import type { SearchEntry } from '$lib/types';

	import { fly } from 'svelte/transition';

	export let selected: SearchEntry | undefined;
	export let onselect: () => void;
	export let onguess: () => void;
	export let onhint: () => void;
	export let hintCondition: () => boolean;
</script>

<div class="join flex justify-center">
	<button on:click={onselect} class="btn join-item w-48">
		<span class="truncate">
			{selected ? selected.label : 'Select Car'}
		</span>
	</button>
	<button on:click={onguess} disabled={!selected} class="btn btn-primary join-item">Guess</button>
	{#if hintCondition()}
		<button on:click={onhint} transition:fly={{ x: '100%' }} class="btn btn-accent join-item">
			Hint
		</button>
	{/if}
</div>
