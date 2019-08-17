import resolvers from "./resolvers";

test("number returns 1", () => {
  expect(resolvers.Query.number()).toEqual(1);
});
