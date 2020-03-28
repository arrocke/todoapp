import faker from "faker";
import { ValidationError } from "core";
import createUserMock from "modules/users/tests/UserRepoMock";
import { UserRepo } from "modules/users/UserRepo";
import RegisterUserUseCase, {
  RegisterUserRequest,
  UsersExistsError
} from "modules/users/RegisterUserUseCase";
import UserEmail from "modules/users/UserEmail";

let userRepo: jest.Mocked<UserRepo>;
let useCase: RegisterUserUseCase;

function getRequest({
  email = faker.internet.email(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  password = faker.internet.password()
}: Partial<RegisterUserRequest> = {}): RegisterUserRequest {
  return { email, firstName, lastName, password };
}

beforeEach(() => {
  userRepo = createUserMock();
  useCase = new RegisterUserUseCase(userRepo);
});

test("returns error if email validation fails", async () => {
  const request = getRequest({ email: "not an email" });
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("email must be a valid email.", "email")
  );
});

test("returns error if user validation fails", async () => {
  const request = getRequest({ email: null });
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("email must not be null.", "email")
  );
});

test("returns error if user already exists", async () => {
  const request = getRequest();
  userRepo.exists.mockResolvedValue(true);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(new UsersExistsError(request.email));
});

test("saves user to database", async () => {
  const request = getRequest();
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isSuccess).toEqual(true);
  expect(userRepo.save).toHaveBeenCalled();
  const [savedUser] = userRepo.save.mock.calls[0];
  expect(savedUser.props).toEqual({
    email: UserEmail.create(request.email).value,
    firstName: request.firstName,
    lastName: request.lastName,
    salt: expect.any(String),
    hash: expect.any(String)
  });
});
