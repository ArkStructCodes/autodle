import hash from "object-hash";

import { assert, assertNonNullish } from "$lib/utils";
import type { Car } from "$lib/schema";

type ArrayItem<A> = A extends readonly (infer T)[] ? T : never;

// check whether the schema for type `Car` contains all the hint keys at compile time
const HINT_KEYS = ["country", "make", "year", "drivetrain", "power", "weight"] as const;
export type HintKey<K = ArrayItem<typeof HINT_KEYS>> = K extends keyof Omit<Car, "name">
  ? K
  : never;

export type GameStatus = "won" | "lost" | "ready";

/**
 * @param cars - Array of cars to guess from.
 * @param answer - An item from the cars array.
 * @param guessLimit - Maximum number of allowed guesses.
 * @param hintThresHold - Hint is enabled when less than this many guesses remain.
 */
export interface GameParams {
  cars: Car[];
  answer: Car;
  guessLimit: number;
  hintThreshold: number;
}

/** Encapsulates internal game state. */
export class GameState {
  params: GameParams;
  guesses: Partial<Car>[];
  guessesUsed: number;
  unrevealedKeys: Set<HintKey>;
  hintUsed: boolean;

  constructor(params: GameParams) {
    assertNonNullish(params.answer);
    assert(
      Array.isArray(params.cars) && params.cars.length > 0,
      "The game did not receive any car data.",
    );
    assert(params.guessLimit > 0, "The guess limit must be higher than 0.");
    assert(
      params.guessLimit >= params.hintThreshold,
      "The hint threshold cannot be higher than the guess limit.",
    );

    this.params = params;
    this.guesses = [];
    this.guessesUsed = 0;
    this.unrevealedKeys = new Set(HINT_KEYS);
    this.hintUsed = false;
  }

  get guessesRemaining(): number {
    return this.params.guessLimit - this.guessesUsed;
  }

  get hintAvailable(): boolean {
    return (
      !this.hintUsed &&
      this.guessesRemaining > 1 &&
      this.guessesRemaining <= this.params.hintThreshold
    );
  }

  get status(): GameStatus {
    // check for the win condition first
    // this lets the game to be won on the last remaining guess
    const lastGuess = this.guesses.at(-1);
    if (lastGuess && hash(lastGuess) === hash(this.params.answer)) {
      return "won";
    }

    if (this.guessesRemaining === 0) {
      return "lost";
    }

    // the game is ready to be continued
    return "ready";
  }
}
