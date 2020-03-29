import faker from "faker";
import createUserMock from "modules/users/tests/UserRepoMock";
import { UserRepo } from "modules/users/UserRepo";
import UpdateUserUseCase, {
  UpdateUserRequest
} from "modules/users/UpdateUserUseCase";
import { ValidationError, EntityIdentifier } from "core";
import { buildUser } from "modules/users/tests/user-factory";
import UserEmail from "modules/users/UserEmail";
import UserName from "modules/users/UserName";
import { UserNotFoundError } from "modules/users/errors";

let userRepo: jest.Mocked<UserRepo>;
let useCase: UpdateUserUseCase;

beforeEach(() => {
  userRepo = createUserMock();
  useCase = new UpdateUserUseCase(userRepo);
});

test("returns error if user does not exist", async () => {
  const request: UpdateUserRequest = {
    id: faker.random.uuid(),
    email: faker.internet.email()
  };
  const id = new EntityIdentifier(request.id);
  userRepo.findById.mockResolvedValue(null);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(new UserNotFoundError(id));
  expect(userRepo.findById).toHaveBeenCalledWith(id);
  expect(userRepo.save).not.toHaveBeenCalled();
});

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
});

test("returns error if firstName validation fails", async () => {
  const user = buildUser();
  const request: UpdateUserRequest = {
    id: user.id.toValue(),
    firstName: ""
  };
  userRepo.findById.mockResolvedValue(user);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("name must have a length of at least 1.", "name")
  );
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
  expect(userRepo.save).not.toHaveBeenCalled();
});

test("returns error if lastName validation fails", async () => {
  const user = buildUser();
  const request: UpdateUserRequest = {
    id: user.id.toValue(),
    lastName: ""
  };
  userRepo.findById.mockResolvedValue(user);
  userRepo.save.mockResolvedValue(undefined);
  const result = await useCase.execute(request);
  expect(result.isFailure).toEqual(true);
  expect(result.error).toEqual(
    new ValidationError("name must have a length of at least 1.", "name")
  );
  expect(userRepo.findById).toHaveBeenCalledWith(user.id);
  expect(userRepo.save).not.toHaveBeenCalled();
});

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
    firstName: UserName.create(request.firstName).value,
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
    lastName: UserName.create(request.lastName).value
  });
});
