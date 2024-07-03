<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

  export let callback: () => void;

	let modal: HTMLDialogElement;
	let alertMessage = '';

	export function show(message: string) {
		alertMessage = message;
		modal.showModal();
	}
</script>

<Modal bind:modal id="alert">
	<p>{alertMessage}</p>
	<div class="space-x-2" slot="action">
		<button on:click={callback} class="btn btn-primary">Yes</button>
		<button class="btn">No</button>
	</div>
</Modal>
