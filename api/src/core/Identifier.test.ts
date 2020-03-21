import Identifier from "core/Identifier";

test("toValue returns the identifier value", () => {
  const id = new Identifier("id-value");
  expect(id.toValue()).toEqual("id-value");
});

test("toString returns the identifier value as a string", () => {
  const id = new Identifier(123);
  expect(id.toString()).toEqual("123");
});

test("equals returns false if the given id is null", () => {
  const id = new Identifier(1);
  expect(id.equals(null)).toEqual(false);
});

test("equals returns false if the given id is undefined", () => {
  const id = new Identifier(1);
  expect(id.equals(undefined)).toEqual(false);
});

test("equals returns false if the given id is not an Identifier", () => {
  const id = new Identifier(1);
  expect(id.equals(1 as any)).toEqual(false);
});

test("equals returns false if the given id does not have the same value", () => {
  const id = new Identifier(1);
  expect(id.equals(new Identifier(2))).toEqual(false);
});

test("equals returns true if the given id has the same value", () => {
  const id = new Identifier(1);
  expect(id.equals(new Identifier(1))).toEqual(true);
});
