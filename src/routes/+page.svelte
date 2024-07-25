<script lang="ts">
	export let data;

	import type { Car } from '$lib/types';
	import { matchingFields, getRandomItem } from '$lib/utils';

	import AlertModal from '$lib/components/AlertModal.svelte';
	import PromptModal from '$lib/components/PromptModal.svelte';
	import SearchModal from './SearchModal.svelte';
	import Healthbar from './Healthbar.svelte';
	import Controls from './Controls.svelte';
	import GuessTable from './GuessTable.svelte';

	import {
		answer,
		selected,
		guesses,
		guessesUsed,
		discoveredFields,
		hintUsed,
		resetStores
	} from './stores';

	import confetti from 'canvas-confetti';
	import { onMount } from 'svelte';

	const hintThreshold = 7;
	const maxGuesses = 10;

	let alert: AlertModal;
	let prompt: PromptModal;
	let search: SearchModal;

	function pushGuess(guess: Partial<Car>) {
		if ($guesses.includes(guess)) {
			alert.show('This car has already been guessed, choose a different car.');
		} else {
			guesses.push(guess);
			$guessesUsed += 1;
		}
	}

	function getHint() {
		if (typeof $answer === 'undefined') throw 'answer is undefined';

		const undiscoveredfields = Object.keys($answer).filter(
			(field) => !$discoveredFields.includes(field)
		) as Array<keyof Car>;
		const hintField = getRandomItem(undiscoveredfields);
		const hint = Object.fromEntries([[hintField, $answer[hintField]]]);

		discoveredFields.push(hintField);
		pushGuess(hint);
		$hintUsed = true;
	}

	function submitGuess() {
		if (typeof $selected === 'undefined') throw 'selected is undefined';

		const car = data.carlist[$selected.index];
		pushGuess(car);
		selected.reset();

		for (const field of matchingFields(car, $answer)) {
			if (!$discoveredFields.includes(field)) {
				discoveredFields.push(field);
			}
		}
	}

	function startNewGame() {
		$answer = getRandomItem(data.carlist);
		resetStores();
	}

	// loss condition
	$: if ($guesses.at(-1) !== $answer && $guessesUsed === maxGuesses) {
		alert.show(`You lost! The car was a ${$answer?.year} ${$answer?.name}.`);
		startNewGame();
	}

	// win condition
	$: if ($guesses.at(-1) === $answer && $guesses.length > 0) {
		confetti({ particleCount: 150, spread: 135 });
		alert.show(`You guessed the right car! It took you ${$guessesUsed} attempts.`);
		startNewGame();
	}

	onMount(() => startNewGame());
</script>

<div class="flex flex-col items-center gap-4 overflow-hidden">
	<Healthbar max={maxGuesses} remaining={maxGuesses - $guessesUsed} />
	<Controls
		bind:selected={$selected}
		onselect={() => search.show()}
		onguess={submitGuess}
		onhint={() => prompt.show('Do you want to use the hint? This will cost 1 guess.')}
		hintCondition={() =>
			// hint is activated when the amount of guesses reaches the threshold
			// disables when only 1 guess is remaining
			!$hintUsed && $guessesUsed >= hintThreshold && $guessesUsed < maxGuesses - 1}
	/>
	<div class="w-full overflow-auto xl:w-2/3">
		<GuessTable guesses={$guesses} answer={$answer} />
	</div>
</div>

<SearchModal bind:this={search} entries={data.names} bind:selected={$selected} />
<AlertModal bind:this={alert} />
<PromptModal bind:this={prompt} callback={getHint} />
