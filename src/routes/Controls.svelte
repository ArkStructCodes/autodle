<script lang="ts">
	import type { SearchEntry } from '$lib/types';

	export let selected: SearchEntry | null;
	export let onselect: () => void;
	export let onguess: () => void;
	export let onhint: () => void;
	export let hintCondition: () => boolean;
</script>

<div class="join flex justify-center">
	<button on:click={onselect} class="btn join-item w-48">
		<span class="truncate">
			{selected ? selected.label : 'Select car'}
		</span>
	</button>

	<button on:click={onguess} disabled={!selected} class="btn btn-primary join-item">Guess</button>

	{#if hintCondition()}
		<button on:click={onhint} class="btn btn-accent join-item">Hint</button>
	{/if}
</div>
