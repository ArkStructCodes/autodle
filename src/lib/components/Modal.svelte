<script lang="ts">
	export let modal: HTMLDialogElement;
	export let id: string;
	export let centered = true;
</script>

<dialog {id} class={`modal ${centered ? 'modal-middle' : 'modal-top'}`} on:close bind:this={modal}>
	<div class="modal-box mx-auto lg:w-1/2">
		<slot />
		{#if $$slots.action}
			<div class="modal-action">
				<form method="dialog">
					<!-- modal should be closed by this -->
					<slot name="action" />
				</form>
			</div>
		{/if}
	</div>
	<!-- automatically close modal when clicked outside -->
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
