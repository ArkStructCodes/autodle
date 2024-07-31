<script lang="ts">
	import { persisted } from 'svelte-persisted-store';

	import Dropdown from '$lib/components/Dropdown.svelte';
	import Swatch from '$lib/icons/Swatch.svelte';

	const themes = ['default', 'light', 'dark'];
	const settings = persisted('settings', { theme: themes[0] });

	let form: HTMLFormElement;

	function handleInput() {
		if (typeof form === 'undefined') {
			throw 'this should not be called when form is not bound';
		}

		const data = new FormData(form);
    const theme = data.get('theme-dropdown');

    if (theme !== null) {
      $settings.theme = theme.toString();
    }
	}
</script>

<Dropdown title="Change Theme">
	<svelte:fragment slot="label">
		<Swatch class="size-5" />
	</svelte:fragment>

	<form bind:this={form} on:input={handleInput} slot="item-list">
		{#each themes as theme}
			<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-ghost btn-block justify-start capitalize"
					aria-label={theme}
					value={theme}
					checked={theme === $settings.theme}
				/>
			</li>
		{/each}
	</form>
</Dropdown>
