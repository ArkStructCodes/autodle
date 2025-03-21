<script lang="ts">
  import Modal from "$lib/components/base/Modal.svelte";

  let dialog: HTMLDialogElement;

  export function show() {
    dialog.showModal();
  }
</script>

<Modal bind:dialog id="help">
  <h1 class="text-3xl font-black">How to play</h1>
  <div class="scroll-indicator my-6 max-h-120 space-y-2 overflow-y-auto">
    <p>
      Your aim is to guess the randomly chosen car in the fewest number of guesses possible.
      The number of remaining guesses is denoted by the dots near the top of the screen.
    </p>
    <p>Click on <strong class="px-1">Select Car</strong> and submit a guess.</p>
    <p>The guessed fields will appear in red, yellow, or green.</p>
    <div class="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-2 items-center">
      <b class="text-neutral bg-rose-500 text-center p-2">Red</b>
      <p>The field does not match the answer.</p>
      <b class="text-neutral bg-amber-500 text-center p-2">Yellow</b>
      <p>The field is within a certain numeric range of the answer, further denoted by ▲ or ▼.</p>
      <b class="text-neutral bg-emerald-500 text-center p-2">Green</b>
      <p>The field matches the answer.</p>
    </div>
    <p>
      With 3 guesses remaining, a wild <strong class="px-1">Hint</strong> button appears! Hint can
      be used only once. Using the hint uses up a guess and reveals a randomly chosen field, so
      choose wisely. The car's name will not be revealed until the end however.
    </p>
    <p>If you manage to guess the car within 10 guesses, 🎉!</p>
  </div>

  {#snippet actions()}
    <button class="btn btn-accent">Continue to Game</button>
  {/snippet}
</Modal>
