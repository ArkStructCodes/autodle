import { CarlistSchema } from '$lib/schema';
import type { SearchEntry } from '$lib/types';

import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: LoadEvent) {
  const data = await fetch('/data.json');
  const carlist = await data.json() as any[];

  // TODO: error handling
  CarlistSchema.parse(carlist);

  const names = carlist.map(car => `${car.year} ${car.name}`);

  return { carlist, names };
}
