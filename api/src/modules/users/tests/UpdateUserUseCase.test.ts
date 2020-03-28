import faker from "faker";
import createUserMock from "modules/users/tests/UserRepoMock";
import { UserRepo } from "modules/users/UserRepo";
import UpdateUserUseCase, {
  UpdateUserRequest
} from "modules/users/UpdateUserUseCase";
import { ValidationError } from "core";
import { buildUser } from "modules/users/tests/user-factory";
import UserEmail from "modules/users/UserEmail";

let userRepo: jest.Mocked<UserRepo>;
let useCase: UpdateUserUseCase;

beforeEach(() => {
  userRepo = createUserMock();
  useCase = new UpdateUserUseCase(userRepo);
});

test.todo("returns error if user does not exist");

test("returns error if email validation fails", async () => {
  const user = buildUser();
  const request: UpdateUserRequest = {
    id: user.id.toValue(),
    email: "not an email"
  };
  userRepo.findById.mockResolvedValue(user);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("email must be a valid email.", "email")
  );
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
  expect(userRepo.save).not.toHaveBeenCalled();
  expect(user.props).not.toMatchObject({
    email: request.email
  });
});

test.todo("returns error if name validation fails");

test("updates email in database", async () => {
  const user = buildUser();
  const request: UpdateUserRequest = {
    id: user.id.toValue(),
    email: faker.internet.email()
  };
  userRepo.findById.mockResolvedValue(user);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isSuccess).toEqual(true);
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
  expect(userRepo.save).toHaveBeenCalledWith(user);
  expect(user.props).toMatchObject({
    email: UserEmail.create(request.email).value
  });
});

test("updates firstName in database", async () => {
  const user = buildUser();
  const lastName = user.props.lastName;
  const request: UpdateUserRequest = {
    id: user.id.toValue(),
    firstName: faker.name.firstName()
  };
  userRepo.findById.mockResolvedValue(user);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isSuccess).toEqual(true);
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
  expect(userRepo.save).toHaveBeenCalledWith(user);
  expect(user.props).toMatchObject({
    firstName: request.firstName,
    lastName
  });
});

test("updates lastName in database", async () => {
  const user = buildUser();
  const firstName = user.props.firstName;
  const request: UpdateUserRequest = {
    id: user.id.toValue(),
    lastName: faker.name.lastName()
  };
  userRepo.findById.mockResolvedValue(user);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isSuccess).toEqual(true);
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
  expect(userRepo.save).toHaveBeenCalledWith(user);
  expect(user.props).toMatchObject({
    firstName,
    lastName: request.lastName
  });
});
