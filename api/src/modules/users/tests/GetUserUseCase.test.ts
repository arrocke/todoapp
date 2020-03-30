import faker from "faker";
import createUserRepoMock from "modules/users/tests/UserRepoMock";
import { UserRepo } from "modules/users/UserRepo";
import UpdateUserUseCase, {
  UpdateUserRequest
} from "modules/users/UpdateUserUseCase";
import { EntityIdentifier } from "core";
import { buildUser } from "modules/users/tests/user-factory";
import { UserNotFoundError } from "modules/users/errors";

let userRepo: jest.Mocked<UserRepo>;
let useCase: UpdateUserUseCase;

beforeEach(() => {
  userRepo = createUserRepoMock();
  useCase = new UpdateUserUseCase(userRepo);
});

test("returns error if user does not exist", async () => {
  const request: UpdateUserRequest = {
    id: faker.random.uuid()
  };
  const id = new EntityIdentifier(request.id);
  userRepo.findById.mockResolvedValue(null);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(new UserNotFoundError(id));
  expect(userRepo.findById).toHaveBeenCalledWith(id);
});

test("returns user if found", async () => {
  const user = buildUser();
  const request: UpdateUserRequest = {
    id: user.id.toValue()
  };
  userRepo.findById.mockResolvedValue(user);
  const result = await useCase.execute(request);
  expect(result.isSuccess).toEqual(true);
  expect(result.value).toBe(user);
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
});
