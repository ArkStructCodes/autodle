<script lang="ts">
  import type { Car } from "$lib/schema";
  import type { GameSnapshot } from "$lib/game";
  import Modal from "$lib/components/base/Modal.svelte";

  interface Props {
    answer: Car;
    snapshot: GameSnapshot;
    nextUpdateAt: number;
  }

  let { answer, snapshot, nextUpdateAt }: Props = $props();

  let timer = $state("--:--:--");
  let newGameAvailable = $state(false);
  let interval: NodeJS.Timeout;

  function tick(): void {
    const deltaSeconds = Math.floor((nextUpdateAt - Date.now()) / 1000);
    if (deltaSeconds < 0) {
      newGameAvailable = true;
      clearInterval(interval);
      return;
    }

    const hours = Math.floor(deltaSeconds / 3600);
    const minutes = Math.floor((deltaSeconds % 3600) / 60);
    const seconds = Math.floor(deltaSeconds % 60);

    timer = [hours, minutes, seconds]
      .map(section => section.toString().padStart(2, "0"))
      .join(":");
  }

  // svelte-ignore non_reactive_update
  let dialog: HTMLDialogElement;

  export function show() {
    interval = setInterval(tick, 1000);
    // skips initial delay and allows the interval to be cleared early
    tick();
    dialog?.showModal();
  }
</script>

<Modal bind:dialog>
  <h2 class="text-3xl font-black">You {snapshot.status}!</h2>
  <div class="my-6">
    <p>The answer was a <b>{answer.year} {answer.name}</b>.</p>
    {#if snapshot.status === "won"}
      {@const num = snapshot.guessesRemaining}
      <p>You had <b>{num}</b> {num === 1 ? "guess" : "guesses"} remaining.</p>
    {/if}
  </div>

  {#snippet actions()}
    <button
      onclick={() => location.reload()}
      disabled={!newGameAvailable}
      class="btn btn-accent w-48"
    >
      {#if newGameAvailable}
        Start New Game
      {:else}
        New Game in {timer}
      {/if}
    </button>
  {/snippet}
</Modal>
