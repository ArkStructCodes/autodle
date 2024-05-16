<script lang="ts">
	export let id: string;
</script>

<script lang="ts" context="module">
  let element: HTMLDialogElement;

	export function show() {
		element.showModal();
	}

	export function hide() {
		element.close();
	}
</script>

<dialog {id} bind:this={element} on:message class="modal modal-top">
	<div class="modal-box mx-auto lg:w-1/2">
		<slot />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
