<script>
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
	<title>Autodle - What's That Automobile?</title>
	<meta
		name="description"
		content="A fun daily puzzle game where you must guess the secret car by in the lowest number of guesses."
	/>
	<meta property="og:title" content="What's That Automobile?" />
	<meta
		property="og:description"
		content="Autodle is a fun daily puzzle game where you must guess the secret car the lowest number of guesses."
	/>
	<meta property="og:site_name" content="Autodle" />
	<meta property="og:url" content="https://autodle.vercel.app" />
	<meta name="google-site-verification" content="fu5BIcy58sYvplz65BT-BKuzI3_HtPs9YmDMXjZ9mck" />
</svelte:head>

{@render children()}
