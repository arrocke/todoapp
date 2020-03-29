import { UserRepo } from "modules/users/UserRepo";
import { UseCase, Result, EntityIdentifier } from "core";
import UserEmail from "modules/users/UserEmail";
import UserName from "modules/users/UserName";
import { UserNotFoundError } from "modules/users/errors";

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
      const id = new EntityIdentifier(request.id);
      const user = await this._userRepo.findById(id);
      if (!user) {
        return this.fail(new UserNotFoundError(id));
      }

      if (request.email) {
        const emailResult = UserEmail.create(request.email);
        if (emailResult.isFailure) {
          return this.fail(emailResult.error);
        }
        const changeEmailResult = user.updateEmail(emailResult.value);
        if (changeEmailResult.isFailure) {
          return this.fail(changeEmailResult.error);
        }
      }

      if (
        typeof request.firstName === "string" ||
        typeof request.lastName === "string"
      ) {
        const firstNameResult = UserName.create(
          typeof request.firstName === "string"
            ? request.firstName
            : user.firstName.value
        );
        if (firstNameResult.isFailure) {
          return this.fail(firstNameResult.error);
        }
        const firstName = firstNameResult.value;

        const lastNameResult = UserName.create(
          typeof request.lastName === "string"
            ? request.lastName
            : user.lastName.value
        );
        if (lastNameResult.isFailure) {
          return this.fail(lastNameResult.error);
        }
        const lastName = lastNameResult.value;
        const nameResult = user.updateName(firstName, lastName);
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
