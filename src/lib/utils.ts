class AssertionError extends Error {
  constructor(message?: string) {
    super(message ?? "assertion failed");
  }
}

export function assert(condition: boolean, message?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(message);
  }
}

export function assertNonNullish<T>(value: T | null | undefined): asserts value is T {
  assert(value != null, `value must not be ${value}`);
}

export function* intersectingProperties<T extends object>(
  original: T,
  object: Partial<T>,
): Generator<keyof T> {
  for (const [key, value] of Object.entries(original) as [keyof T, T[keyof T]][]) {
    if (object[key] === value) {
      yield key;
    }
  }
}

export function pickRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
