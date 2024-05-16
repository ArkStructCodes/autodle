<script lang="ts">
	export let data;

	import type { Car, ComboboxEntry } from '$lib/types';
	import { randInt, showDialog } from '$lib/utils';
	import GuessTable from './GuessTable.svelte';
	import ComboboxDialog from '$lib/components/ComboboxDialog.svelte';
	import Healthbar from './Healthbar.svelte';
	import Controls from './Controls.svelte';

	const answer = data.carlist[data.answer];
	console.log(answer);

	let guesses: Array<Partial<Car>> = [];
	let guessesLeft = 10;

	let discoveredKeys = ['name'];
	let hintUsed = false;
	const hintThreshold = 3;

	let selected: ComboboxEntry | null;

	function addGuess(guess: Partial<Car>) {
		if (guesses.includes(guess)) {
			alert('this has already been guessed');
			return;
		}

		guesses = [...guesses, guess];
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			alert('you lose');
			location.reload();
		}
	}

	function giveHint() {
		const hintableKeys = Object.keys(answer).filter((k) => !discoveredKeys.includes(k));
		const hintKey = hintableKeys[randInt(hintableKeys.length - 1)];
		const hint = Object.fromEntries([[hintKey, answer[hintKey]]]);

		discoveredKeys = [...discoveredKeys, hintKey];
		addGuess(hint);
		hintUsed = true;
	}

	// TODO: stores, state
	function guessCar() {
		const guess = data.carlist[selected?.index];
		addGuess(guess);

		for (const [k1, v1] of Object.entries(answer)) {
			for (const [k2, v2] of Object.entries(guess)) {
				if (k1 == k2 && v1 == v2) {
					discoveredKeys = [...discoveredKeys, k1];
				}
			}
		}

		if (selected?.index === data.answer) {
			alert('you win');
			location.reload();
		}

		selected = null;
	}

	const dialogId = 'dialog';
</script>

<div class="flex flex-col items-center gap-4 overflow-hidden">
		<Healthbar max={10} remaining={guessesLeft} />
		<Controls
			{selected}
			onselect={() => showDialog(dialogId)}
			onguess={guessCar}
			onhint={giveHint}
			hintCondition={() => guessesLeft <= hintThreshold && !hintUsed}
		/>
	<div class="w-full overflow-auto lg:w-1/2">
		<GuessTable {guesses} {answer} />
	</div>
</div>

<ComboboxDialog id={dialogId} entries={data.names} bind:selected />
