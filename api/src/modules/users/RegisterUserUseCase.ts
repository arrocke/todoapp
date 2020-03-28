import { UseCase, Result } from "core";
import { UserRepo } from "modules/users/UserRepo";
import User from "modules/users/User";
import UserEmail from "modules/users/UserEmail";

export interface RegisterUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class UsersExistsError extends Error {
  constructor(email: string) {
    super(`A user with the email ${email} already exists.`);
    this.name = "UsersExistsError";
  }
}

export default class RegisterUserUseCase extends UseCase<
  RegisterUserRequest,
  undefined
> {
  private readonly _userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    super();
    this._userRepo = userRepo;
  }

  async execute(request: RegisterUserRequest): Promise<Result> {
    try {
      const { firstName, lastName, password } = request;

      const emailResult = UserEmail.create(request.email);
      if (emailResult.isFailure) {
        return this.fail(emailResult.error);
      }
      const email = emailResult.value;

      if (await this._userRepo.exists(request.email)) {
        return this.fail(new UsersExistsError(request.email));
      }

      const userResult = User.register(
        { email, firstName, lastName },
        password
      );
      if (userResult.isFailure) {
        return this.fail(userResult.error);
      }
      const user = userResult.value;

      await this._userRepo.save(user);

      return this.success();
    } catch (error) {
      return this.fail(error);
    }
  }
}
