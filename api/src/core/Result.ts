export default class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private _value?: T | Error;

  get error(): Error {
    if (this.isSuccess) {
      throw new Error(
        "Can't get the error of an success result. Use 'value' instead."
      );
    }
    return this._value as Error;
  }

  get value(): T {
    if (this.isFailure) {
      throw new Error(
        "Can't get the value of an error result. Use 'error' instead."
      );
    }
    return this._value as T;
  }

  public constructor(isSuccess: boolean, value?: T | Error) {
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

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, value);
  }

  public static fail<U>(error?: Error | string): Result<U> {
    return new Result<U>(
      false,
      error instanceof Error ? error : new Error(error)
    );
  }

  public static combine(...results: Result<any>[]): Result<void> {
    for (const result of results) {
      if (result.isFailure) return Result.fail(result.error);
    }
    return Result.ok();
  }
}
