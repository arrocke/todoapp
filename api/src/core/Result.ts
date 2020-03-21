/** Returns a successful or failed result from an operation. */
export default class Result<T> {
  private _value?: T | Error;

  /** True if result is a success. */
  public readonly isSuccess: boolean;

  /** True if result is a failure. */
  public readonly isFailure: boolean;

  /**
   * The error if result is a failure.
   * @throws Throws {Error} result is not a failure.
   */
  get error(): Error {
    if (this.isSuccess) {
      throw new Error(
        "Can't get the error of an success result. Use 'value' instead."
      );
    }
    return this._value as Error;
  }

  /**
   * The value if result is a success.
   * @throws Throws {Error} result is not a success.
   */
  get value(): T {
    if (this.isFailure) {
      throw new Error(
        "Can't get the value of an error result. Use 'error' instead."
      );
    }
    return this._value as T;
  }

  private constructor(isSuccess: boolean, value?: T | Error) {
    if (isSuccess && value instanceof Error) {
      throw new Error(
        "InvalidOperation: A success result cannot contain an error"
      );
    }
    if (!isSuccess && !(value instanceof Error)) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;

    Object.freeze(this);
  }

  /**
   * Creates a successful result with an optional value.
   * @param value The result value.
   */
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, value);
  }

  /**
   * Creates a failed result with an optional error.
   * @param error The error object or message.
   */
  public static fail<U>(error?: Error | string): Result<U> {
    return new Result<U>(
      false,
      error instanceof Error ? error : new Error(error)
    );
  }

  /**
   * Creates a single result object from a list of results
   * that is successful if all results are successful,
   * or is a failure if one is a failure.
   * @param results The list of results to combine.
   */
  public static combine(...results: Result<any>[]): Result<void> {
    for (const result of results) {
      if (result.isFailure) return Result.fail(result.error);
    }
    return Result.ok();
  }
}
