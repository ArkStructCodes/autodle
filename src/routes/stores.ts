import type { Car, SearchEntry } from '$lib/types';
import { createArrayStore, createStore } from '$lib/utils';

const guesses = createArrayStore<Partial<Car>>([]);
const guessesUsed = createStore(0);
const selected = createStore<SearchEntry | null>(null);
const discoveredFields = createArrayStore<keyof Car>(['name']);
const hintUsed = createStore(false);

function reset() {
	guesses.reset();
	guessesUsed.reset();
	selected.reset();
	discoveredFields.reset();
	hintUsed.reset();
}

export default {
	guesses,
	guessesUsed,
	selected,
	discoveredFields,
	hintUsed,
	reset
};
