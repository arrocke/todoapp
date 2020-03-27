import faker from "faker";
import createUserMock from "modules/users/tests/UserRepoMock";
import { UserRepo } from "modules/users/UserRepo";
import UpdateUserUseCase, {
  UpdateUserRequest
} from "modules/users/UpdateUserUseCase";
import { ValidationError } from "core";
import { buildUser } from "modules/users/tests/user-factory";

let userRepo: jest.Mocked<UserRepo>;
let useCase: UpdateUserUseCase;

function getRequest({
  id = faker.random.uuid(),
  email = faker.internet.email(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName()
}: Partial<UpdateUserRequest> = {}): UpdateUserRequest {
  return { id, email, firstName, lastName };
}

beforeEach(() => {
  userRepo = createUserMock();
  useCase = new UpdateUserUseCase(userRepo);
});

test.todo("returns error if user does not exist");
test.todo("returns error if email validation fails");
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
    email: request.email
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
