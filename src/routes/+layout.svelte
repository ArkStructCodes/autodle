<script>
	import '../app.css';
</script>

<div class="flex flex-col h-dvh">
	<nav class="navbar bg-base-100">
        <div class="navbar-start">placeholder for icon</div>
		<div class="navbar-center">
			<a href="/" class="btn btn-ghost text-xl">Autodle</a>
		</div>
		<div class="navbar-end">
			<a>todo</a>
		</div>
	</nav>
	<slot />
</div>
