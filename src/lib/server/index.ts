import { hash } from "ohash";
import { createClient, type SetOptions } from "@redis/client";
import { Value } from "@sinclair/typebox/value";

import { carsSchema, type Car } from "$lib/schema";
import { assert, randomInteger } from "$lib/utils";

import data from "./data.json";

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export let gameParams: {
  cars: Car[];
  answer: Car;
  guessLimit: number;
  hintThreshold: number;
};
export let session: string;
export let updatedAt: number;

export async function setGameParams(setOptions?: SetOptions): Promise<void> {
  const cars = Value.Parse(carsSchema, data);

  await redis.set("answerIndex", randomInteger(cars.length), setOptions);
  await redis.set("updatedAt", Date.now(), setOptions);

  const answerIndex = parseInt((await redis.get("answerIndex")) as any);
  assert(!isNaN(answerIndex));

  updatedAt = parseInt((await redis.get("updatedAt")) as any);
  assert(!isNaN(updatedAt));

  gameParams = {
    cars,
    answer: cars[answerIndex],
    guessLimit: 10,
    hintThreshold: 3,
  };
  session = hash(gameParams);
}

await setGameParams({ NX: true });
