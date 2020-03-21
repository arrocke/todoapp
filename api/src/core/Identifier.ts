/** An idenifier for an object. */
export default class Identifier<T> {
  private readonly value: T;

  /**
   * Creates an Identifier.
   * @param value The identifier value.
   */
  constructor(value: T) {
    this.value = value;
  }

  /**
   * Determines if two Identifiers are the same.
   * @param id The other Identifier to compare.
   */
  equals(id?: Identifier<T>): boolean {
    return (
      id !== null &&
      id !== undefined &&
      id instanceof this.constructor &&
      id.toValue() === this.value
    );
  }

  /** Converts the Identifier to a string. */
  toString(): string {
    return String(this.value);
  }

  /** Gets the Identifier value. */
  toValue(): T {
    return this.value;
  }
}
