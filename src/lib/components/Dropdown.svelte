<div class="dropdown" {...$$props}>
	<div tabindex="0" role="button" class="btn btn-ghost">
		<slot name="label" />
		<!-- indicator chevron -->
		<svg
			class="inline-block size-2 fill-current opacity-60"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"
		>
			<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
		</svg>
	</div>
	<!-- svelte-ignore a11y-positive-tabindex a11y-no-noninteractive-tabindex -->
	<ul tabindex="1" class="dropdown-content z-[2] rounded-box bg-base-300 p-2 shadow-xl">
		<slot name="item-list" />
	</ul>
</div>
