<script lang="ts">
	export let data;

	import type { Car } from '$lib/types';
	import { randomInteger, matchingFields } from '$lib/utils';

	import Healthbar from './Healthbar.svelte';
	import Controls from './Controls.svelte';
	import GuessTable from './GuessTable.svelte';
	import Search from './Search.svelte';
	// import SummaryModal from './SummaryModal.svelte';

	import gameData from './stores';
	import Alert from './Alert.svelte';

	const { guesses, guessesUsed, selected, discoveredFields, hintUsed } = gameData;
	let answer: Car;

	function generateAnswer() {
		const answerIndex = randomInteger(data.carlist.length);
		answer = data.carlist[answerIndex];
		console.log(answer.name);
	}

	const hintThreshold = 7;
	const maxGuesses = 10;

	let alert: Alert;
	let search: Search;

	function addGuess(guess: Partial<Car>) {
		if ($guesses.includes(guess)) {
			alert.show('This car has already been guessed, choose a different car.');
			return;
		}

		guesses.push(guess);
		$guessesUsed += 1;
	}

	function giveHint() {
		const hintableKeys = Object.keys(answer).filter(
			(key) => !$discoveredFields.includes(key as keyof Car)
		) as Array<keyof Car>;
		const hintKey = hintableKeys[randomInteger(hintableKeys.length - 1)];
		const hint = Object.fromEntries([[hintKey, answer[hintKey]]]);
		addGuess(hint);

		discoveredFields.push(hintKey);
		$hintUsed = true;
	}

	function guessCar() {
		// this will never be called when `selected` is `null`
		const guess = data.carlist[$selected?.index as number];
		addGuess(guess);

		for (const field of matchingFields(guess, answer)) {
			discoveredFields.push(field as keyof Car);
		}

		$selected = null;
	}

	$: if ($guessesUsed === maxGuesses) {
		alert?.show('you lose');
		generateAnswer();
		gameData.reset();
	}

	$: if ($guesses.at(-1) === answer) {
		alert?.show('you win');
		generateAnswer();
		gameData.reset();
	}
</script>

<div class="flex flex-col items-center gap-4 overflow-hidden">
	<Healthbar max={maxGuesses} remaining={maxGuesses - $guessesUsed} />
	<Controls
		bind:selected={$selected}
		onselect={() => search.show()}
		onguess={guessCar}
		onhint={giveHint}
		hintCondition={() =>
			!$hintUsed && $guessesUsed >= hintThreshold && $guessesUsed < maxGuesses - 1}
	/>
	<div class="w-full overflow-auto lg:w-1/2">
		<GuessTable guesses={$guesses} {answer} />
	</div>
</div>

<Search entries={data.names} bind:selected={$selected} bind:this={search} />
<!-- <SummaryModal guessesMade={maxGuesses - $guessesLeft} /> -->
<Alert bind:this={alert} />
