import validate from "core/validate";
import Result from "./Result";

test("validates that a value is not undefined", () => {
  expect(
    validate({
      value: undefined,
      name: "value",
      notUndefined: true
    })
  ).toEqual(Result.fail(new Error("value must not be undefined.")));
  expect(
    validate({
      value: 1,
      name: "value",
      notUndefined: true
    })
  ).toEqual(Result.ok());
  expect(
    validate({
      value: null,
      name: "value",
      notUndefined: true
    })
  ).toEqual(Result.ok());
});

test("validates that a value is not null", () => {
  expect(
    validate({
      value: null,
      name: "value",
      notNull: true
    })
  ).toEqual(Result.fail(new Error("value must not be null.")));
  expect(
    validate({
      value: 1,
      name: "value",
      notNull: true
    })
  ).toEqual(Result.ok());
  expect(
    validate({
      value: undefined,
      name: "value",
      notNull: true
    })
  ).toEqual(Result.ok());
});

test("validates that a value matches a string", () => {
  expect(
    validate({
      value: "does not match",
      name: "value",
      matches: {
        pattern: "search",
        label: "a valid value"
      }
    })
  ).toEqual(Result.fail(new Error("value must be a valid value.")));
  expect(
    validate({
      value: "does match",
      name: "value",
      matches: {
        pattern: "match",
        label: "a valid value"
      }
    })
  ).toEqual(Result.ok());
});

test("validates that a value matches a regular expression", () => {
  expect(
    validate({
      value: "does not match",
      name: "value",
      matches: {
        pattern: /\w{6}/,
        label: "a valid value"
      }
    })
  ).toEqual(Result.fail(new Error("value must be a valid value.")));
  expect(
    validate({
      value: "does match",
      name: "value",
      matches: {
        pattern: /\w{2}/,
        label: "a valid value"
      }
    })
  ).toEqual(Result.ok());
});

test("validates mutliple values", () => {
  expect(
    validate(
      {
        value: undefined,
        name: "value1",
        notUndefined: true
      },
      {
        value: undefined,
        name: "value2",
        notUndefined: true
      }
    )
  ).toEqual(Result.fail(new Error("value1 must not be undefined.")));
  expect(
    validate(
      {
        value: 1,
        name: "value1",
        notUndefined: true
      },
      {
        value: undefined,
        name: "value2",
        notUndefined: true
      }
    )
  ).toEqual(Result.fail(new Error("value2 must not be undefined.")));
  expect(
    validate(
      {
        value: 1,
        name: "value1",
        notUndefined: true
      },
      {
        value: 2,
        name: "value2",
        notUndefined: true
      }
    )
  ).toEqual(Result.ok());
});
