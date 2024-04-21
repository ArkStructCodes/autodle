import type { LoadEvent } from '@sveltejs/kit';
import { CarlistSchema } from '$lib/schema';
import { randInt } from '$lib/utils';

export async function load({ fetch }: LoadEvent) {
    const data = await fetch('/data.json');
    const carlist = await data.json();

    // TODO: error handling
    CarlistSchema.parse(carlist);

    let names = [];
    for (let i = 0; i < carlist.length; i++) {
        const car = carlist[i];
        names.push({ index: i, label: `${car.year} ${car.name}` });
    }

    const answer = randInt(carlist.length);

    return { carlist, names, answer };
}
