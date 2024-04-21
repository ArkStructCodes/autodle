<script lang="ts">
	export let id: string;
</script>

<dialog {id} class="modal modal-top">
	<div class="modal-box">
		<slot />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
