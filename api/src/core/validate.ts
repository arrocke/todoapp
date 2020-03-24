import Result from "core/Result";

interface ValidateArgs {
  value: any;
  name: string;
  notUndefined?: boolean;
  notNull?: boolean;
  matches?: {
    pattern: RegExp | string;
    label: string;
  };
}

export class ValidationError extends Error {
  readonly propName: string;

  constructor(message: string, propName: string) {
    super(message);
    this.propName = propName;
  }
}

export default function validate(...args: ValidateArgs[]): Result<void> {
  for (const { value, name, ...validates } of args) {
    if (validates.notUndefined && value === undefined) {
      return Result.fail(
        new ValidationError(`${name} must not be undefined.`, name)
      );
    }
    if (validates.notNull && value === null) {
      return Result.fail(
        new ValidationError(`${name} must not be null.`, name)
      );
    }
    if (validates.matches && !String(value).match(validates.matches.pattern)) {
      return Result.fail(
        new ValidationError(`${name} must be ${validates.matches.label}.`, name)
      );
    }
  }
  return Result.ok();
}
