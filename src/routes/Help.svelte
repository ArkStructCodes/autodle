<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let modal: HTMLDialogElement;

	export function show() {
		modal.showModal();
	}
</script>

<Modal bind:modal id="help" centered={true}>
	<h1 class="text-2xl font-bold">How to play</h1>
	<div class="my-8 space-y-4">
		<p>Click on <strong>Select Car</strong> and submit a guess.</p>
		<p>The guessed fields will be colored red, yellow, or green.</p>
		<div class="grid grid-cols-[6ch_1fr] gap-x-4">
			<b class="bg-success">Green</b>
			<p>The field matches the answer.</p>
			<b class="bg-error">Red</b>
			<p>The field does not match the answer.</p>
			<b class="bg-warning">Yellow</b>
			<p>The field is within a certain range of the answer.</p>
		</div>
		<p>With 3 guesses remaining, a wild hint button appears!</p>
		<p>
			Hint can be used only once.
      Using a hint consumes a guess and gives the correct value of a randomly chosen field.
		</p>
    <p>If you manage to guess the car within 10 guesses, you win!</p>
	</div>
	<button class="btn" slot="action">Play!</button>
</Modal>
