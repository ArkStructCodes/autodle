import hash from "object-hash";
import { writable } from "svelte/store";
import type { Readable, Subscriber, Unsubscriber, Writable } from "svelte/store";

import { assertNonNullish, intersectingProperties, pickRandomItem } from "$lib/utils";
import type { Car } from "$lib/schema";

import { GameState } from "./state";
import type { GameParams, GameStatus, HintKey } from "./state";

import { GameError } from "./error";

/**
 * Immutable representation of the game state. Can be safely serialized.
 */
export interface GameSnapshot {
  session: string;
  guesses: Partial<Car>[];
  guessesRemaining: number;
  unrevealedKeys: HintKey[];
  hintUsed: boolean;
  hintAvailable: boolean;
  status: GameStatus;
}

/** Manages a game session. */
export class Game implements Readable<GameSnapshot> {
  private session: string;
  private state: GameState;
  private snapshot: Writable<GameSnapshot>;

  /**
   * Creates a new game session.
   * @param - Parameters for the session.
   */
  constructor(params: GameParams) {
    this.session = hash(params);
    this.state = new GameState(params);
    this.snapshot = writable(this.dump());
  }

  /**
   * Restores a game session from a snapshot object.
   * @param snapshot - The snapshot to restore.
   */
  load(snapshot: GameSnapshot): void {
    if (this.session !== snapshot.session) {
      throw new GameError("SessionMismatch");
    }
    this.state.guesses = snapshot.guesses;
    this.state.guessesUsed = snapshot.guesses.length;
    this.state.unrevealedKeys = new Set(snapshot.unrevealedKeys);
    this.state.hintUsed = snapshot.hintUsed;
    this.snapshot.set(this.dump());
  }

  /**
   * Returns a snapshot of the game session.
   * @returns Serializable snapshot object.
   */
  dump(): GameSnapshot {
    return {
      session: this.session,
      guesses: this.state.guesses,
      guessesRemaining: this.state.guessesRemaining,
      unrevealedKeys: Array.from(this.state.unrevealedKeys),
      hintUsed: this.state.hintUsed,
      hintAvailable: this.state.hintAvailable,
      status: this.state.status,
    };
  }

  /**
   * Interface for receiving game updates.
   *
   * This is a wrapper around the older reactive store from svelte for immutably
   * exposing internal state.
   * @param run - Subscription callback.
   * @param invalidate - Cleanup callback.
   * @returns Callback for unsubscribing from updates.
   */
  subscribe(run: Subscriber<GameSnapshot>, invalidate?: () => void): Unsubscriber {
    return this.snapshot.subscribe(run, invalidate);
  }

  private addNewGuess(guess: Partial<Car>): void {
    this.state.guesses.push(guess);
    this.state.guessesUsed++;
  }

  private revealDiscoveredKeys(car: Car): void {
    for (const key of intersectingProperties(this.state.params.answer, car)) {
      if (key === "name") {
        continue;
      }
      this.state.unrevealedKeys.delete(key);
    }
  }

  /**
   * Adds a hint to the guesses.
   *
   * Only one hint is available each session. When the number of guesses remaining
   * falls below the threshold set upon initialization, the hint becomes available.
   * This hint is chosen randomly from a set of keys which have not already been
   * correctly guessed. This uses up a guess.
   */
  hint(): void {
    if (this.state.hintUsed) {
      throw new GameError("HintExhausted");
    }
    if (!this.state.hintAvailable) {
      throw new GameError("HintUnavailable");
    }
    const key = pickRandomItem(Array.from(this.state.unrevealedKeys));
    const hint = { [key]: this.state.params.answer[key] };
    this.addNewGuess(hint);
    this.state.hintUsed = true;
    this.snapshot.set(this.dump());
  }

  /**
   * Adds a guess.
   * @param carIndex - Index of the guessed car in the cars array.
   */
  guess(carIndex: number): void {
    const car = this.state.params.cars[carIndex];
    assertNonNullish(car);
    if (this.state.guesses.includes(car)) {
      throw new GameError("DuplicateGuess");
    }
    this.addNewGuess(car);
    if (this.state.status === "ready") {
      this.revealDiscoveredKeys(car);
    }
    this.snapshot.set(this.dump());
  }
}
