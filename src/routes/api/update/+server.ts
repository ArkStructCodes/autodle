import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { state } from "$lib/server";

export const GET: RequestHandler = ({ request }) => {
  if (request.headers.get("Authorization") !== `Bearer ${process.env.GAME_SECRET}`) {
    return error(401, "this endpoint is not for external use");
  }
  state.updateAnswer();
  return json({ message: "answer updated", data: state.answer }, { status: 202 });
};
