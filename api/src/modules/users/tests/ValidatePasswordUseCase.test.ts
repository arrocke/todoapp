import faker from "faker";
import createUserRepoMock from "modules/users/tests/UserRepoMock";
import { UserRepo } from "modules/users/UserRepo";
import ValidatePasswordUseCase, {
  ValidatePasswordRequest
} from "modules/users/ValidatePasswordUseCase";
import { InvalidEmailError } from "modules/users/errors";
import { buildUser } from "modules/users/tests/user-factory";

let userRepo: jest.Mocked<UserRepo>;
let useCase: ValidatePasswordUseCase;

beforeEach(() => {
  userRepo = createUserRepoMock();
  useCase = new ValidatePasswordUseCase(userRepo);
});

test("returns error if user does not exist", async () => {
  const request: ValidatePasswordRequest = {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
  userRepo.findByEmail.mockResolvedValue(null);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(new InvalidEmailError(request.email));
  expect(userRepo.findByEmail).toHaveBeenCalledWith(request.email);
});

test("returns error if password is not correct", async () => {
  const user = buildUser();
  const request: ValidatePasswordRequest = {
    email: user.email.value,
    password: faker.internet.password()
  };
  userRepo.findByEmail.mockResolvedValue(user);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(new Error("Password is incorrect."));
});

test("returns without error if password is correct", async () => {
  const password = faker.internet.password();
  const user = buildUser({ password });
  const request: ValidatePasswordRequest = {
    email: user.email.value,
    password
  };
  userRepo.findByEmail.mockResolvedValue(user);
  const result = await useCase.execute(request);
  expect(result.isSuccess).toEqual(true);
});
