<script lang="ts">
	import '../app.css';
	import Help from './Help.svelte';

	let help: Help;
</script>

<div class="flex h-dvh flex-col">
	<header class="navbar bg-base-100 px-4">
		<div class="navbar-start"></div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-2xl">Autodle</a>
		</div>
		<div class="navbar-end">
			<button on:click={help.show} class="btn btn-ghost text-xl">?</button>
		</div>
	</header>
	<slot />
</div>
<Help bind:this={help} />
