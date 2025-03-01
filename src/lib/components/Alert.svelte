<script lang="ts" module>
  import Modal from "./base/Modal.svelte";

  // svelte-ignore non_reactive_update
  let dialog: HTMLDialogElement;
  let text = $state("");

  export function alert(message: string) {
    text = message;
    dialog.showModal();
  }
</script>

<Modal bind:dialog>
  <p class="scroll-indicator max-h-120 overflow-y-auto">{text}</p>

  {#snippet actions()}
    <button class="btn btn-accent">Okay</button>
  {/snippet}
</Modal>
