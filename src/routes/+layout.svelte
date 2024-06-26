<script lang="ts">
	import '../app.css';
	import Help from './Help.svelte';

	let help: Help;
</script>

<svelte:head>
	<title>Autodle - Guess The Car</title>
	<meta
		name="description"
		content="A fun little puzzle game where you must guess the car by its stats."
	/>
	<meta property="og:title" content="We're Car Guys, Of Course We Guess" />
	<meta
		property="og:description"
		content="Autodle is u fun little puzzle game where you must guess the car by its stats."
	/>
  <meta property="og:site_name" content="Autodle">
	<meta property="og:url" content="https://autodle.vercel.app" />
</svelte:head>

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
