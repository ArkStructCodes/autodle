<script lang="ts">
	let timer: number | undefined;
	let open: boolean;

	function closeWithin(timeout: number) {
		clearTimeout(timer);
		timer = setTimeout(() => (open = false), timeout);
	}

	$: if (open) {
		closeWithin(2000);
	}
</script>

<details bind:open class="dropdown" {...$$props}>
	<summary class="btn btn-square btn-ghost flex flex-nowrap">
		<slot name="label" />
		<!-- indicator chevron -->
		<svg
			class="size-2 fill-current opacity-60"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"
		>
			<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
		</svg>
	</summary>

	<ul
		on:mouseenter={() => clearTimeout(timer)}
		on:mouseleave={() => closeWithin(1000)}
		class="menu dropdown-content z-[2] rounded-box bg-base-300 p-2 shadow-xl"
	>
		<!-- children must be contained within `li` -->
		<slot name="item-list" />
	</ul>
</details>
