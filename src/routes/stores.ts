import type { Car, SearchEntry } from "$lib/types";
import { resettable, resettableArray } from "$lib/utils";

import { writable } from "svelte/store";

export const answer = writable<Car | undefined>(undefined);
export const guesses = resettableArray<Partial<Car>>([]);
export const guessesUsed = resettable(0);
export const selected = resettable<SearchEntry | undefined>(undefined);
export const discoveredFields = resettableArray(['name']);
export const hintUsed = resettable(false);

export function resetStores() {
  guesses.reset();
  guessesUsed.reset();
  selected.reset();
  discoveredFields.reset();
  hintUsed.reset();
}
