export class AssertionError extends Error {
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

export function randomInteger(upto: number): number {
  return Math.floor(Math.random() * upto);
}

export function pickRandomItem<T>(iterable: Iterable<T>): T {
  const array = Array.isArray(iterable) ? iterable : Array.from(iterable);
  return array[randomInteger(array.length)];
}
