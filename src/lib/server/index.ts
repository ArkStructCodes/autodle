import { Value } from "@sinclair/typebox/value";

import { carsSchema, type Car } from "$lib/schema";
import { pickRandomItem } from "$lib/utils";

import data from "./data.json";

class State {
  private car: Car;
  private timestamp: number;

  constructor(cars: Car[]) {
    this.car = pickRandomItem(cars);
    this.timestamp = Date.now();
  }

  get answer(): Car {
    return this.car;
  }

  get updatedAt(): number {
    return this.timestamp;
  }

  updateAnswer(): void {
    this.car = pickRandomItem(cars);
    this.timestamp = Date.now();
  }
}

export const cars = Value.Parse(carsSchema, data);
export const state = new State(cars);
