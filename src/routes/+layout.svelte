<script lang="ts">
	import '../app.css';

	import ThemeController from '$lib/components/ThemeController.svelte';
	import Help from '$lib/icons/Help.svelte';
	import HelpModal from './HelpModal.svelte';

	let help: HelpModal;
</script>

<svelte:head>
	<title>Autodle - Guess The Car</title>
	<meta
		name="description"
		content="A fun little puzzle game where you must guess the car by its stats in the lowest number of guesses."
	/>
	<meta property="og:title" content="We're Car Guys, Of Course We Guess" />
	<meta
		property="og:description"
		content="Autodle is a fun little puzzle game where you must use your wits guess the car by its stats in the lowest number of guesses."
	/>
	<meta property="og:site_name" content="Autodle" />
	<meta property="og:url" content="https://autodle.vercel.app" />
</svelte:head>

<div class="flex h-dvh flex-col">
	<header class="navbar bg-base-100 px-4">
		<div class="navbar-start"></div>
		<div class="navbar-center">
			<h1 class="text-2xl font-extrabold">Autodle</h1>
		</div>
		<div class="navbar-end">
			<ThemeController />
			<button on:click={help.show} class="btn btn-ghost" title="Help">
				<Help class="size-5" />
			</button>
		</div>
	</header>
	<slot />
</div>

<HelpModal bind:this={help} />
