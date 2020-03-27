import { UserRepo } from "modules/users/UserRepo";
import { UseCase, Result, EntityIdentifier } from "core";

export interface UpdateUserRequest {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export default class UpdateUserUseCase extends UseCase<
  UpdateUserRequest,
  undefined
> {
  private readonly _userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    super();
    this._userRepo = userRepo;
  }

  async execute(request: UpdateUserRequest): Promise<Result> {
    try {
      const { id } = request;

      const user = await this._userRepo.findById(new EntityIdentifier(id));
      if (!user) {
        return this.fail(new Error());
      }

      if (request.email) {
        const emailResult = user.updateEmail(request.email);
        if (emailResult.isFailure) {
          return this.fail(emailResult.error);
        }
      }

      if (request.firstName || request.lastName) {
        const nameResult = user.updateName(
          request.firstName || user.firstName,
          request.lastName || user.lastName
        );
        if (nameResult.isFailure) {
          return this.fail(nameResult.error);
        }
      }

      await this._userRepo.save(user);

      return this.success();
    } catch (error) {
      return this.fail(error);
    }
  }
}
