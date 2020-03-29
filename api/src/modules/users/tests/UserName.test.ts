import faker from "faker";
import UserName from "modules/users/UserName";
import { ValidationError } from "core";

test("create returns error if value is undefined", () => {
  const result = UserName.create(undefined);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("name must not be undefined.", "name")
  );
});

test("create returns error if value is null", () => {
  const result = UserName.create(null);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("name must not be null.", "name")
  );
});

test("create returns error if value does not have a length of at least one", () => {
  const result = UserName.create("");
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("name must have a length of at least 1.", "name")
  );
});

test("create returns UserName if value is valid", () => {
  const name = faker.name.firstName();
  const result = UserName.create(name);
  expect(result.isSuccess).toEqual(true);
  expect(result.value.value).toEqual(name);
});
