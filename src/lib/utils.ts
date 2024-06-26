import { writable } from 'svelte/store';
import type { Resettable, ResettableArray } from './types';

function getRandomInteger(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

export function getRandomItem<T>(arr: T[]): T {
  return arr[getRandomInteger(arr.length - 1)];
}

export function* matchingFields(obj1: any, obj2: any) {
  for (const [k1, v1] of Object.entries(obj1)) {
    for (const [k2, v2] of Object.entries(obj2)) {
      if (k1 === k2 && v1 === v2) {
        yield k1;
      }
    }
  }
}

export function resettable<T>(initial: T): Resettable<T> {
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set,
    update,
    reset: () => set(structuredClone(initial)),
  };
}

export function resettableArray<T>(initial: T[]): ResettableArray<T> {
  const store = resettable(initial);

  return {
    ...store,
    push: (value: T) => store.update((arr) => {
      arr.push(value);
      return arr;
    }),
  };
}
