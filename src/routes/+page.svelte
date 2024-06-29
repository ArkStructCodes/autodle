<script lang="ts">
	export let data;

	import Healthbar from './Healthbar.svelte';
	import Controls from './Controls.svelte';
	import GuessTable from './GuessTable.svelte';
	import Search from './Search.svelte';
	import Alert from './Alert.svelte';

	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	import type { Car, SearchEntry } from '$lib/types';
	import { matchingFields, getRandomItem, resettable, resettableArray } from '$lib/utils';

	const hintThreshold = 7;
	const maxGuesses = 10;

	let alertbox: Alert;
	let search: Search;

	const answer = writable<Car | undefined>(undefined);
	const guesses = resettableArray<Partial<Car>>([]);
  const guessesUsed = resettable(0);
	const selected = resettable<SearchEntry | undefined>(undefined);
	const discoveredFields = resettableArray(['name']);
	const hintUsed = resettable(false);

	function pushGuess(guess: Partial<Car>) {
		if ($guesses.includes(guess)) {
			alertbox.show('This car has already been guessed, choose a different car.');
		} else {
			guesses.push(guess);
			$guessesUsed += 1;
		}
	}

	function getHint() {
		if (typeof $answer === 'undefined') {
			throw 'answer should not be undefined when this is called';
		}

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
		if (typeof $selected === 'undefined') {
			throw 'this will never be called when selected is undefined';
		}

		const car = data.carlist[$selected.index];
		pushGuess(car);
		$selected = undefined;

		for (const field of matchingFields(car, $answer)) {
			if (!$discoveredFields.includes(field)) {
				discoveredFields.push(field);
			}
		}
	}

	function reset() {
		guesses.reset();
		guessesUsed.reset();
		selected.reset();
		discoveredFields.reset();
		hintUsed.reset();
	}

	function startNewGame() {
		$answer = getRandomItem(data.carlist);
		reset();
	}

	$: if ($guessesUsed === maxGuesses) {
		alertbox.show(`You lost! The car was a ${$answer?.year} ${$answer?.name}.`);
		startNewGame();
	}

	$: if ($guesses.length > 0 && $guesses.at(-1) === $answer) {
		alertbox.show(`You guessed the right car! It took you ${$guessesUsed} attempts.`);
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
		onhint={getHint}
		hintCondition={() =>
			!$hintUsed && $guessesUsed >= hintThreshold && $guessesUsed < maxGuesses - 1}
	/>
	<div class="w-full overflow-auto lg:w-1/2">
		<GuessTable guesses={$guesses} answer={$answer} />
	</div>
</div>

<Search entries={data.names} bind:selected={$selected} bind:this={search} />
<Alert bind:this={alertbox} />
