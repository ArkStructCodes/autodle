const ERRORS = {
  SessionMismatch: "Cannot load a different game session.",
  HintExhausted: "The hint has already been used.",
  HintUnavailable: "The hint is not yet available",
  DuplicateGuess: "This car has already been guessed, guess a different car.",
} as const;

type ErrorKind = keyof typeof ERRORS;

export class GameError extends Error {
  kind: ErrorKind;

  constructor(kind: ErrorKind) {
    super(ERRORS[kind]);
    this.name = "GameError";
    this.kind = kind;
  }
}
