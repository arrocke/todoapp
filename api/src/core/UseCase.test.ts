import Result from "core/Result";
import UseCase from "core/UseCase";

class TestUseCase extends UseCase<boolean, string> {
  async execute(fail: boolean): Promise<Result<string>> {
    if (fail) {
      return this.fail(new Error("failed"));
    } else {
      return this.success("response");
    }
  }
}

test("returns a success result if successful", async () => {
  const useCase = new TestUseCase();
  await expect(useCase.execute(false)).resolves.toEqual(Result.ok("response"));
});

test("returns an error result if failed", async () => {
  const useCase = new TestUseCase();
  await expect(useCase.execute(true)).resolves.toEqual(
    Result.fail(new Error("failed"))
  );
});
