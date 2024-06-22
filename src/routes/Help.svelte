<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let modal: HTMLDialogElement;

	export function show() {
		modal.showModal();
	}
</script>

<Modal bind:modal id="help" centered={true}>
	<h1 class="text-2xl font-bold">How to play</h1>
	<p class="my-4">under construction</p>
	<button class="btn" slot="action">Play!</button>
</Modal>
