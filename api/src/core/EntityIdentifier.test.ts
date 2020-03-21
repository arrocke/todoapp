import { v1 as uuid } from "uuid";
import EntityIdentifier from "core/EntityIdentifier";

test("creates an identifier with a random uuid when no value is given", () => {
  const id = new EntityIdentifier();
  expect(id.toValue()).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/);
});

test("creates an identifier with the given value", () => {
  const idValue = uuid();
  const id = new EntityIdentifier(idValue);
  expect(id.toValue()).toEqual(idValue);
});
