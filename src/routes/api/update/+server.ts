import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { setGameParams, gameParams } from "$lib/server";

export const GET: RequestHandler = async ({ request }) => {
  console.log("Got update request with the following headers:", request.headers);
  if (request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return error(401, "This endpoint is not for external use.");
  }
  await setGameParams();
  return json({ message: "Answer updated.", gameParams }, { status: 202 });
};
