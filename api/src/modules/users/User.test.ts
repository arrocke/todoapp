import crypto from "crypto";
import faker from "faker";
import User, { UserProps } from "modules/users/User";
import { EntityIdentifier, ValidationError, DomainEventBus } from "core";
import UserCreatedEvent from "modules/users/events";

function getUserProps(
  overrides: Partial<UserProps> = {},
  password: string = faker.internet.password()
): UserProps {
  const salt = crypto.randomBytes(8).toString("hex");
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    salt,
    hash: hash.digest("hex"),
    ...overrides
  };
}

test("create returns an error if email is undefined", () => {
  const result = User.create(
    getUserProps({ email: undefined }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be undefined.", "email")
  );
});

test("create returns an error if email is null", () => {
  const result = User.create(
    getUserProps({ email: null }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be null.", "email")
  );
});

test("create returns an error if firstName is undefined", () => {
  const result = User.create(
    getUserProps({ firstName: undefined }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("firstName must not be undefined.", "firstName")
  );
});

test("create returns an error if firstName is null", () => {
  const result = User.create(
    getUserProps({ firstName: null }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("firstName must not be null.", "firstName")
  );
});

test("create returns an error if lastName is undefined", () => {
  const result = User.create(
    getUserProps({ lastName: undefined }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("lastName must not be undefined.", "lastName")
  );
});

test("create returns an error if lastName is null", () => {
  const result = User.create(
    getUserProps({ lastName: null }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("lastName must not be null.", "lastName")
  );
});

test("create returns an error if salt is undefined", () => {
  const result = User.create(
    getUserProps({ salt: undefined }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("salt must not be undefined.", "salt")
  );
});

test("create returns an error if salt is null", () => {
  const result = User.create(
    getUserProps({ salt: null }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("salt must not be null.", "salt")
  );
});

test("create returns an error if hash is undefined", () => {
  const result = User.create(
    getUserProps({ hash: undefined }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("hash must not be undefined.", "hash")
  );
});

test("create returns an error if salt is null", () => {
  const result = User.create(
    getUserProps({ hash: null }),
    new EntityIdentifier()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("hash must not be null.", "hash")
  );
});

test("create returns a User entity", () => {
  const props = getUserProps();
  const id = new EntityIdentifier();
  const result = User.create(props, id);
  expect(result.isSuccess).toBe(true);
  expect(result.value.props).toEqual(props);
  expect(result.value.id).toEqual(id);
  const handler = jest.fn();
  DomainEventBus.addHandler(UserCreatedEvent.name, handler);
  result.value.dispatchEvents();
  expect(handler).not.toHaveBeenCalled();
});

test("register returns an error if email is undefined", () => {
  const result = User.register(
    getUserProps({ email: undefined }),
    faker.internet.password()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be undefined.", "email")
  );
});

test("register returns an error if email is null", () => {
  const result = User.register(
    getUserProps({ email: null }),
    faker.internet.password()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be null.", "email")
  );
});

test("register returns an error if firstName is undefined", () => {
  const result = User.register(
    getUserProps({ firstName: undefined }),
    faker.internet.password()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("firstName must not be undefined.", "firstName")
  );
});

test("register returns an error if firstName is null", () => {
  const result = User.register(
    getUserProps({ firstName: null }),
    faker.internet.password()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("firstName must not be null.", "firstName")
  );
});

test("register returns an error if lastName is undefined", () => {
  const result = User.register(
    getUserProps({ lastName: undefined }),
    faker.internet.password()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("lastName must not be undefined.", "lastName")
  );
});

test("register returns an error if lastName is null", () => {
  const result = User.register(
    getUserProps({ lastName: null }),
    faker.internet.password()
  );
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("lastName must not be null.", "lastName")
  );
});

test("register returns an error if password is undefined", () => {
  const result = User.register(getUserProps(), undefined);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("password must not be undefined.", "password")
  );
});

test("register returns an error if password is null", () => {
  const result = User.register(getUserProps(), null);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("password must not be null.", "null")
  );
});

test("register returns a User entity with a salt and hash and raises event", () => {
  const props = getUserProps();
  const password = faker.internet.password();
  const result = User.register(props, password);
  expect(result.isSuccess).toBe(true);
  expect(result.value.props).toEqual({
    ...props,
    salt: expect.any(String),
    hash: expect.any(String)
  });
  const hash = crypto.createHmac("sha512", result.value.props.salt);
  hash.update(password);
  expect(hash.digest("hex")).toEqual(result.value.props.hash);
  expect(result.value.id.toValue()).toMatch(
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  );
  const handler = jest.fn();
  DomainEventBus.addHandler(UserCreatedEvent.name, handler);
  result.value.dispatchEvents();
  expect(handler).toHaveBeenCalledWith({
    timestamp: expect.any(Date),
    aggregateId: result.value.id
  });
});

test("updateName returns an error if new firstName is undefined", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const { firstName, lastName } = user.props;
  const result = user.updateName(undefined, faker.name.lastName());
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("firstName must not be undefined.", "firstName")
  );
  expect(user.props).toMatchObject({ firstName, lastName });
});

test("updateName returns an error if new firstName is null", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const { firstName, lastName } = user.props;
  const result = user.updateName(null, faker.name.lastName());
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("firstName must not be null.", "firstName")
  );
  expect(user.props).toMatchObject({ firstName, lastName });
});

test("updateName returns an error if new lastName is undefined", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const { firstName, lastName } = user.props;
  const result = user.updateName(faker.name.lastName(), undefined);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("lastName must not be undefined.", "lastName")
  );
  expect(user.props).toMatchObject({ firstName, lastName });
});

test("updateName returns an error if new lastName is null", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const { firstName, lastName } = user.props;
  const result = user.updateName(faker.name.lastName(), null);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("lastName must not be null.", "lastName")
  );
  expect(user.props).toMatchObject({ firstName, lastName });
});

test("updateName changes first and last names", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const newFirstName = faker.name.firstName();
  const newLastName = faker.name.lastName();
  const result = user.updateName(newFirstName, newLastName);
  expect(result.isSuccess).toBe(true);
  expect(user.props).toMatchObject({
    firstName: newFirstName,
    lastName: newLastName
  });
});

test("updateEmail returns an error if new email is undefined", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const { email } = user.props;
  const result = user.updateEmail(undefined);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be undefined.", "email")
  );
  expect(user.props).toMatchObject({ email });
});

test("updateEmail returns an error if new email is null", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const { email } = user.props;
  const result = user.updateEmail(null);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be null.", "email")
  );
  expect(user.props).toMatchObject({ email });
});

test("updateEmail changes email", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const newEmail = faker.internet.email();
  const result = user.updateEmail(newEmail);
  expect(result.isSuccess).toBe(true);
  expect(user.props).toMatchObject({
    email: newEmail
  });
});

test("changePassword returns an error if password is undefined", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const result = user.changePassword(undefined);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("password must not be undefined.", "password")
  );
});

test("changePassword returns an error if password is null", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const result = user.changePassword(null);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("password must not be null.", "null")
  );
});

test("changePassword updates salt and hash", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const newPassword = faker.internet.password();
  const result = user.changePassword(newPassword);
  expect(result.isSuccess).toBe(true);
  expect(user.props).toMatchObject({
    salt: expect.any(String),
    hash: expect.any(String)
  });
  const hash = crypto.createHmac("sha512", user.props.salt);
  hash.update(newPassword);
  expect(hash.digest("hex")).toEqual(user.props.hash);
});

test("validatePassword returns an error if password is undefined", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const result = user.validatePassword(undefined);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("password must not be undefined.", "password")
  );
});

test("validatePassword returns an error if password is null", () => {
  const { value: user } = User.create(getUserProps(), new EntityIdentifier());
  const result = user.validatePassword(null);
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("password must not be null.", "null")
  );
});

test("validatePassword returns an error if password does not match salt and hash", () => {
  const password = faker.internet.password();
  const { value: user } = User.create(
    getUserProps({}, password),
    new EntityIdentifier()
  );
  const result = user.validatePassword(faker.internet.password());
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(new Error("Password is incorrect."));
});

test("validatePassword returns a successful result if password matches salt and hash", () => {
  const password = faker.internet.password();
  const { value: user } = User.create(
    getUserProps({}, password),
    new EntityIdentifier()
  );
  const result = user.validatePassword(password);
  expect(result.isSuccess).toBe(true);
});
