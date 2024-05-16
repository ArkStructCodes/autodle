<script lang="ts">
	export let max: number;
	export let remaining: number;

	const colors = ['error', 'warning', 'success'];

	// will always be 1 or greater
	const segmentLength = Math.max(1, Math.floor(max / colors.length));

	function getColor(health: number, dot: number) {
		if (dot >= health) {
			return 'bg-base-300';
		}

		const segment = Math.floor(Math.max(1, health - 1) / segmentLength);
		const colorIndex = Math.min(colors.length - 1, segment);
		return `bg-${colors[colorIndex]}`;
	}
</script>

<div class={`flex items-center justify-around gap-2 ${$$props.class}`}>
	{#each { length: max } as _, dot}
		<span class={`size-4 ${getColor(remaining, dot)} rounded-full`}></span>
	{/each}
</div>
