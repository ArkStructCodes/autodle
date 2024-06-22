<script context="module">
	import Modal, { showModal } from './Modal.svelte';
	export { showModal as showSummary };
</script>

<script lang="ts">
	export let guessesMade: number;
</script>

<Modal id="summary">
	<h1>{guessesMade}</h1>
</Modal>
