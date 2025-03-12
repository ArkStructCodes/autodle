const ERRORS = {
  InvalidParams: "Cannot start game due to invalid parameters.",
  HintExhausted: "The hint has already been used.",
  HintUnavailable: "The hint is not yet available",
  DuplicateGuess: "This car has already been guessed, guess a different car.",
} as const;

type ErrorKind = keyof typeof ERRORS;

export class GameError extends Error {
  kind: ErrorKind;

  constructor(kind: ErrorKind, options?: ErrorOptions) {
    super(ERRORS[kind], options);
    this.name = "GameError";
    this.kind = kind;
  }
}
