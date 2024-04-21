import { z } from 'zod';
import { CarSchema } from './schema';

export type Car = z.infer<typeof CarSchema>;

export type ComboboxEntry = {
    index: number;
    label: string;
};

export type Nullable<T> = T | null;
