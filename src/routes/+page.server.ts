import { cars, state } from "$lib/server";

import type { PageServerLoad } from "./$types";

const DAY = 24 * 60 * 60 * 1000;

export const load: PageServerLoad = () => {
  return {
    nextUpdateAt: state.updatedAt + DAY,
    searchItems: cars.map(car => `${car.year} ${car.name}`),
    gameParams: {
      cars,
      answer: state.answer,
      guessLimit: 10,
      hintThreshold: 3,
    },
  };
};
