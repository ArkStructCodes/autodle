import type { LoadEvent } from '@sveltejs/kit';
import { CarlistSchema } from '$lib/schema';
import type { SearchEntry } from '$lib/types';

export async function load({ fetch }: LoadEvent) {
	const data = await fetch('/data.json');
	const carlist = await data.json();

	// TODO: error handling
	CarlistSchema.parse(carlist);

	let names: SearchEntry[] = [];
	for (let i = 0; i < carlist.length; i++) {
		const car = carlist[i];
		names.push({ index: i, label: `${car.year} ${car.name}` });
	}

	return { carlist, names };
}
