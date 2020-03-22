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

export default function validate(...args: ValidateArgs[]): Result<void> {
  for (const { value, name, ...validates } of args) {
    if (validates.notUndefined && value === undefined) {
      return Result.fail(new Error(`${name} must not be undefined.`));
    }
    if (validates.notNull && value === null) {
      return Result.fail(new Error(`${name} must not be null.`));
    }
    if (validates.matches && !String(value).match(validates.matches.pattern)) {
      return Result.fail(
        new Error(`${name} must be ${validates.matches.label}.`)
      );
    }
  }
  return Result.ok();
}
