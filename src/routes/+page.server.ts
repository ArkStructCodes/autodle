import { gameParams, session, updatedAt } from "$lib/server";

import type { PageServerLoad } from "./$types";

const DAY = 24 * 60 * 60 * 1000;

export const load: PageServerLoad = () => {
  return {
    gameParams,
    session,
    nextUpdateAt: updatedAt + DAY,
    searchItems: gameParams.cars.map(car => `${car.year} ${car.name}`),
  };
};
