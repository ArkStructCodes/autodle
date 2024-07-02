<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let modal: HTMLDialogElement;
	let alertMessage = '';

	export function show(message: string) {
		alertMessage = message;
		modal.showModal();
	}
</script>

<Modal bind:modal id="alert" centered={true}>
	<p>{alertMessage}</p>
	<button class="btn" slot="action">Okay</button>
</Modal>
