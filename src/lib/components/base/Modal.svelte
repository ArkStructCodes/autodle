<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Bindable reference to the underlying dialog element.
     */
    dialog?: HTMLDialogElement;
    /**
     * Position of the modal. Displays in the middle by default.
     */
    position?: "top" | "middle" | "bottom";
    /**
     * Snippet containing modal action buttons.
     * Must contain one or more buttons. Clicking on any of them will close the modal.
     * When left empty, the modal can be closed when clicked outside.
     */
    actions?: Snippet<[]>;
  }

  let { dialog = $bindable(), position, actions, children, ...rest }: Props = $props();
</script>

<dialog
  bind:this={dialog}
  class="modal"
  class:modal-top={position === "top"}
  class:modal-middle={position === "middle"}
  class:modal-bottom={position === "bottom"}
>
  <div {...rest} class={["modal-box mx-auto lg:w-1/2", rest.class]}>
    {@render children?.()}
    <!-- render modal action buttons when present -->
    {#if actions !== undefined}
      <div class="modal-action">
        <form method="dialog">
          {@render actions()}
        </form>
      </div>
    {/if}
  </div>

  <!-- allows the modal to be closed when no action buttons are present -->
  {#if actions === undefined}
    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  {/if}
</dialog>
