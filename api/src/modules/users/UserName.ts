import { ValueObject, validate, Result } from "core";

export interface UserNameProps {
  value: string;
}

export default class UserName extends ValueObject<UserNameProps> {
  get value(): string {
    return this.props.value;
  }

  static create(name: string): Result<UserName> {
    const validationResult = validate({
      value: name,
      name: "name",
      notUndefined: true,
      notNull: true,
      minLength: 1
    });
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }

    return Result.ok(new UserName({ value: name }));
  }
}
