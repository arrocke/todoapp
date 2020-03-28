import faker from "faker";
import UserEmail from "modules/users/UserEmail";
import { ValidationError } from "core";

test("create returns error if value is undefined", () => {
  const result = UserEmail.create(undefined);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be undefined.", "email")
  );
});

test("create returns error if value is null", () => {
  const result = UserEmail.create(null);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be null.", "email")
  );
});

test("create returns error if value does match an email regex", () => {
  const result = UserEmail.create("not an email");
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("email must be a valid email.", "email")
  );
});

test("create returns UserEmail if value is valid", () => {
  const email = faker.internet.email();
  const result = UserEmail.create(email);
  expect(result.isSuccess).toEqual(true);
  expect(result.value.value).toEqual(email);
});
