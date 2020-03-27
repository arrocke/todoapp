import { UserRepo } from "../UserRepo";

function createUserRepoMock(): jest.Mocked<UserRepo> {
  return {
    exists: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    save: jest.fn()
  };
}

export default createUserRepoMock;
