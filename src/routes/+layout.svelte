<script>
	import '../app.css';
	import ThemeController from '$lib/components/ThemeController.svelte';
</script>

<div class="flex flex-col h-dvh">
	<header class="navbar px-4 bg-base-100">
		<div class="navbar-start">placeholder for icon</div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-xl">Autodle</a>
		</div>
		<div class="navbar-end">
			<ThemeController theme="dark" />
		</div>
	</header>
	<slot />
</div>
