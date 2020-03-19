import ValueObject from "core/ValueObject";

class TestValueObject extends ValueObject<string> {
  static create(value: string): TestValueObject {
    return new TestValueObject(value);
  }
}

test("value objects are not equal if the second is null", () => {
  const obj1 = TestValueObject.create("test");
  expect(obj1.equals(null)).toBe(false);
});

test("value objects are not equal if the second is undefined", () => {
  const obj1 = TestValueObject.create("test");
  expect(obj1.equals(undefined)).toBe(false);
});

test("value objects are not equal if the props of the second are undefined", () => {
  const obj1 = TestValueObject.create("test");
  const obj2 = TestValueObject.create(undefined);
  expect(obj1.equals(obj2)).toBe(false);
});

test("value objects are equal if they have the same structure and values", () => {
  const obj1 = TestValueObject.create("test");
  const obj2 = TestValueObject.create("test");
  expect(obj1.equals(obj2)).toBe(true);
});
