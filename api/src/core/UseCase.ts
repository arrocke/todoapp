import Result from "core/Result";

/** Base class for creating use cases. */
export default abstract class UseCase<Request, Response> {
  /**
   * Method implemented by derived classes that defines the use case.
   * @param request The data used to complete the use case.
   */
  abstract execute(request?: Request): Promise<Result<Response>>;

  /**
   * Helper method to create a typed success result.
   * @param response The response to return.
   */
  protected success(response?: Response): Result<Response> {
    return Result.ok(response);
  }

  /**
   * Helper method to create a typed error result.
   * @param error The error to return.
   */
  protected fail(error: Error): Result<Response> {
    return Result.fail(error);
  }
}
