import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { state } from "$lib/server";

export const GET: RequestHandler = ({ request }) => {
  console.log("Got update request with the following headers:", request.headers);
  if (request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return error(401, "This endpoint is not for external use.");
  }
  state.updateAnswer();
  return json({ message: "Answer updated.", data: state.answer }, { status: 202 });
};
