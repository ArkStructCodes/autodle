<script lang="ts">
	export let data;

	import type { Car } from '$lib/schema';
	import Select from 'svelte-select';
	import GuessTable from './GuessTable.svelte';

	const answer = data.carlist[data.answer];
    console.log(answer);

	let guessIndex: number;
	let guesses: Car[] = [];
	let guessesLeft = 10;
	let disabled = true;

    // TODO: stores, dialogs
	function guessCar() {
        const guess = data.carlist[guessIndex];
        if (guesses.includes(guess)) {
            alert('this has already been guessed');
            return;
        }

		guesses = [...guesses, guess];
		guessesLeft -= 1;

		if (guessIndex == data.answer) {
			alert('you win');
			return;
		}

		if (guessesLeft == 0) {
			alert('you lose');
			return;
		}

		disabled = true;
	}

    function handleEnter(event: KeyboardEvent) {
        if (!disabled && event.key === 'Enter') {
            guessCar();
        }
    }
</script>

<div class="flex flex-col items-center h-full">
	<p>guesses left {guessesLeft} (placeholder), check console for answer</p>
	<div class="flex flex-col gap-8 w-3/4 max-h-[48rem]">
		<div class="flex gap-2" on:keyup={handleEnter}>
			<Select
				class="flex-1"
				itemId="index"
				items={data.names}
				bind:justValue={guessIndex}
                placeholder="Please select a car"
				on:select={() => (disabled = false)}
			/>
			<button on:click={guessCar} {disabled} class="btn btn-primary">Guess</button>
		</div>
		<div class="h-full overflow-auto">
			<GuessTable {guesses} {answer} />
		</div>
	</div>
</div>
