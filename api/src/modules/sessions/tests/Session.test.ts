import Session, { SessionProps } from "modules/sessions/Session";
import { EntityIdentifier, ValidationError } from "core";

function getSessionProps(overrides: Partial<SessionProps> = {}): SessionProps {
  return { userId: new EntityIdentifier(), ...overrides };
}

test("create returns error if userId is undefined", () => {
  const result = Session.create(getSessionProps({ userId: undefined }));
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("userId must not be undefined.", "userId")
  );
});

test("create returns error if userId is null", () => {
  const result = Session.create(getSessionProps({ userId: null }));
  expect(result.isFailure).toBe(true);
  expect(result.error).toEqual(
    new ValidationError("userId must not be null.", "userId")
  );
});

test("create returns a session entity with the given identifier", () => {
  const props = getSessionProps();
  const id = new EntityIdentifier();
  const result = Session.create(props, id);
  expect(result.isSuccess).toBe(true);
  expect(result.value.props).toEqual(props);
  expect(result.value.id).toEqual(id);
});

test("create returns a session entity with a random identifier", () => {
  const props = getSessionProps();
  const result = Session.create(props);
  expect(result.isSuccess).toBe(true);
  expect(result.value.props).toEqual(props);
  expect(result.value.id.toValue()).toMatch(
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  );
});
