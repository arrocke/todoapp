import Result from "core/Result";

test("ok constructs a successful result", () => {
  const result = Result.ok<string>("success message");
  expect(result.isSuccess).toEqual(true);
  expect(result.isFailure).toEqual(false);
  expect(result.value).toEqual("success message");
  expect(() => result.error).toThrow(
    new Error("Can't get the error of an success result. Use 'value' instead.")
  );
});

test("fail constructs a failed result with an error message", () => {
  const result = Result.fail<string>("error message");
  expect(result.isSuccess).toEqual(false);
  expect(result.isFailure).toEqual(true);
  expect(() => result.value).toThrow(
    new Error("Can't get the value of an error result. Use 'error' instead.")
  );
  expect(result.error).toEqual(new Error("error message"));
});

test("fail constructs a failed result with an error", () => {
  const result = Result.fail<string>(new TypeError("invalid type"));
  expect(result.isSuccess).toEqual(false);
  expect(result.isFailure).toEqual(true);
  expect(() => result.value).toThrow(
    new Error("Can't get the value of an error result. Use 'error' instead.")
  );
  expect(result.error).toEqual(new TypeError("invalid type"));
});

test("combine returns the first failed result", () => {
  const result = Result.combine(
    Result.ok("success message"),
    Result.fail("failed message"),
    Result.fail("another failed message")
  );
  expect(result.isSuccess).toEqual(false);
  expect(result.isFailure).toEqual(true);
  expect(() => result.value).toThrow(
    new Error("Can't get the value of an error result. Use 'error' instead.")
  );
  expect(result.error).toEqual(new Error("failed message"));
});

test("combine returns success if all results are successful", () => {
  const result = Result.combine(
    Result.ok("success message"),
    Result.ok("another success message")
  );
  expect(result.isSuccess).toEqual(true);
  expect(result.isFailure).toEqual(false);
  expect(result.value).toBeUndefined();
  expect(() => result.error).toThrow(
    new Error("Can't get the error of an success result. Use 'value' instead.")
  );
});
