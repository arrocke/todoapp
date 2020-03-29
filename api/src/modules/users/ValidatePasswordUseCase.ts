import { UseCase, Result } from "core";
import { UserRepo } from "modules/users/UserRepo";
import { InvalidEmailError } from "modules/users/errors";

export interface ValidatePasswordRequest {
  email: string;
  password: string;
}

export default class ValidatePasswordUseCase extends UseCase<
  ValidatePasswordRequest,
  undefined
> {
  private readonly _userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    super();
    this._userRepo = userRepo;
  }

  async execute(request: ValidatePasswordRequest): Promise<Result> {
    try {
      const { email, password } = request;

      const user = await this._userRepo.findByEmail(email);
      if (!user) {
        return this.fail(new InvalidEmailError(email));
      }

      const validateResult = user.validatePassword(password);
      if (validateResult.isFailure) {
        return this.fail(validateResult.error);
      }

      return this.success();
    } catch (error) {
      return this.fail(error);
    }
  }
}
