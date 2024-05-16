<script>
	import '../app.css';
	// import ThemeController from '$lib/components/ThemeController.svelte';
</script>

<div class="flex h-dvh flex-col">
	<header class="navbar bg-base-100 px-4">
		<div class="navbar-start">placeholder for icon</div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-2xl">Autodle</a>
		</div>
		<div class="navbar-end">
			<!-- <ThemeController theme="dark" /> -->
		</div>
	</header>
	<slot />
</div>
