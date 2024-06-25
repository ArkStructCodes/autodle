import { CarSchema } from './schema';

import { z } from 'zod';
import type { Writable } from 'svelte/store';

export type Car = z.infer<typeof CarSchema>;

export type SearchEntry = {
  index: number;
  label: string;
};

interface Reset {
  reset: () => void;
}

interface Push<T> {
  push: (val: T) => void;
}

export interface Resettable<T> extends Writable<T>, Reset { }
export interface ResettableArray<T> extends Resettable<T[]>, Push<T> { }
