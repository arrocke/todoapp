import { ValueObject, Result, validate } from "core";

export interface UserEmailProps {
  value: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  static create(email: string): Result<UserEmail> {
    const validationResult = validate({
      value: email,
      name: "email",
      notUndefined: true,
      notNull: true,
      matches: {
        pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/,
        label: "a valid email"
      }
    });
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }

    return Result.ok(new UserEmail({ value: email }));
  }
}
