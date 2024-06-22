import { writable } from 'svelte/store';
import type { ArrayStore, Store } from './types';

export function randomInteger(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

export function* matchingFields(obj1: object, obj2: object) {
  for (const [k1, v1] of Object.entries(obj1)) {
    for (const [k2, v2] of Object.entries(obj2)) {
      if (k1 === k2 && v1 === v2) {
        yield k1;
      }
    }
  }
}

export function createStore<T>(initial: T): Store<T> {
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set,
    update,
    reset: () => set(structuredClone(initial))
  };
}

export function createArrayStore<T>(initial: T[]): ArrayStore<T> {
  const store = createStore(initial);

  return {
    ...store,
    push: (val: T) =>
      store.update((arr) => {
        arr.push(val);
        return arr;
      })
  };
}
