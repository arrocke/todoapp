import { UserRepo } from "modules/users/UserRepo";
import { UseCase, Result, EntityIdentifier } from "core";
import UserEmail from "modules/users/UserEmail";
import UserName from "modules/users/UserName";
import { UserNotFoundError } from "modules/users/errors";
import User from "modules/users/User";

export interface GetUserRequest {
  id: string;
}

export default class GetUserUseCase extends UseCase<GetUserRequest, User> {
  private readonly _userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    super();
    this._userRepo = userRepo;
  }

  async execute(request: GetUserRequest): Promise<Result<User>> {
    try {
      const id = new EntityIdentifier(request.id);
      const user = await this._userRepo.findById(id);
      if (!user) {
        return this.fail(new UserNotFoundError(id));
      }

      return this.success(user);
    } catch (error) {
      return this.fail(error);
    }
  }
}
