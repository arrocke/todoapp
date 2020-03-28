import faker from "faker";
import { Pool } from "pg";
import { getDb } from "test/utils";
import {
  insertDbUser,
  findDbUser,
  buildUser
} from "modules/users/tests/user-factory";
import { EntityIdentifier } from "core";
import { PostgresUserRepo, UserRepo } from "modules/users/UserRepo";
import UserEmail from "modules/users/UserEmail";

let pool: Pool;
let repo: UserRepo;

beforeAll(() => {
  pool = getDb();
  repo = new PostgresUserRepo(pool);
});

beforeEach(async () => {
  await pool.query("DELETE FROM users");
});

afterAll(() => {
  pool.end();
});

test("exists returns true if the user exists in the database", async () => {
  const dbUser = await insertDbUser(pool);
  await expect(repo.exists(dbUser.email)).resolves.toEqual(true);
});

test("exists returns false if the user does not exist in the database", async () => {
  await expect(repo.exists(faker.internet.email())).resolves.toEqual(false);
});

test("findByEmail returns the user if it exists in the database", async () => {
  const dbUser = await insertDbUser(pool);
  const user = await repo.findByEmail(dbUser.email);
  expect(user.id.toValue()).toEqual(dbUser.id);
  expect(user.props).toEqual({
    email: UserEmail.create(dbUser.email).value,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    salt: dbUser.salt,
    hash: dbUser.hash
  });
});

test("findByEmail returns null if it does not exist in the database", async () => {
  await expect(repo.findByEmail(faker.internet.email())).resolves.toEqual(null);
});

test("findById returns the user if it exists in the database", async () => {
  const dbUser = await insertDbUser(pool);
  const user = await repo.findById(new EntityIdentifier(dbUser.id));
  expect(user.id.toValue()).toEqual(dbUser.id);
  expect(user.props).toEqual({
    email: UserEmail.create(dbUser.email).value,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    salt: dbUser.salt,
    hash: dbUser.hash
  });
});

test("findById returns null if it does not exist in the database", async () => {
  await expect(
    repo.findById(new EntityIdentifier(faker.random.uuid()))
  ).resolves.toEqual(null);
});

test("save creates a new record if it does not exist", async () => {
  const user = buildUser();
  jest.spyOn(user, "dispatchEvents");
  await repo.save(user);
  await expect(findDbUser(pool, user.id.toValue())).resolves.toEqual({
    id: user.id.toValue(),
    email: user.props.email.value,
    first_name: user.props.firstName,
    last_name: user.props.lastName,
    salt: user.props.salt,
    hash: user.props.hash
  });
  expect(user.dispatchEvents).toHaveBeenCalled();
});

test("save updates existing user if it already exists", async () => {
  const dbUser = await insertDbUser(pool);
  const user = buildUser({ id: dbUser.id });
  jest.spyOn(user, "dispatchEvents");
  await repo.save(user);
  await expect(findDbUser(pool, dbUser.id)).resolves.toEqual({
    id: user.id.toValue(),
    email: user.props.email.value,
    first_name: user.props.firstName,
    last_name: user.props.lastName,
    salt: user.props.salt,
    hash: user.props.hash
  });
  expect(user.dispatchEvents).toHaveBeenCalled();
});
