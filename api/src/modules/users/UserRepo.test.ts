import faker from "faker";
import { Pool } from "pg";
import { getDb } from "test/utils";
import { PostgresUserRepo, DbUser, UserRepo } from "modules/users/UserRepo";
import { EntityIdentifier } from "core";
import User from "./User";

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

async function insertUser(): Promise<DbUser> {
  const user = {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    salt: faker.random.alphaNumeric(16),
    hash: faker.random.alphaNumeric(128)
  };
  await pool.query({
    text:
      "INSERT INTO users(id, email, first_name, last_name, salt, hash) VALUES($1, $2, $3, $4, $5, $6)",
    values: [
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.salt,
      user.hash
    ]
  });
  return user;
}

async function getUser(id: string): Promise<DbUser> {
  const { rows } = await pool.query<DbUser>({
    text:
      "SELECT id, email, first_name, last_name, salt, hash FROM users WHERE id = $1",
    values: [id]
  });
  return rows[0];
}

test("exists returns true if the user exists in the database", async () => {
  const dbUser = await insertUser();
  await expect(repo.exists(dbUser.email)).resolves.toEqual(true);
});

test("exists returns false if the user does not exist in the database", async () => {
  await expect(repo.exists(faker.internet.email())).resolves.toEqual(false);
});

test("findByEmail returns the user if it exists in the database", async () => {
  const dbUser = await insertUser();
  const user = await repo.findByEmail(dbUser.email);
  expect(user.id.toValue()).toEqual(dbUser.id);
  expect(user.props).toEqual({
    email: dbUser.email,
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
  const dbUser = await insertUser();
  const user = await repo.findById(new EntityIdentifier(dbUser.id));
  expect(user.id.toValue()).toEqual(dbUser.id);
  expect(user.props).toEqual({
    email: dbUser.email,
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
  const { value: user } = User.create(
    {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      salt: faker.random.alphaNumeric(16),
      hash: faker.random.alphaNumeric(128)
    },
    new EntityIdentifier(faker.random.uuid())
  );
  jest.spyOn(user, "dispatchEvents");
  await repo.save(user);
  await expect(getUser(user.id.toValue())).resolves.toEqual({
    id: user.id.toValue(),
    email: user.props.email,
    first_name: user.props.firstName,
    last_name: user.props.lastName,
    salt: user.props.salt,
    hash: user.props.hash
  });
  expect(user.dispatchEvents).toHaveBeenCalled();
});

test("save updates existing user if it already exists", async () => {
  const dbUser = await insertUser();
  const { value: user } = User.create(
    {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      salt: faker.random.alphaNumeric(16),
      hash: faker.random.alphaNumeric(128)
    },
    new EntityIdentifier(dbUser.id)
  );
  jest.spyOn(user, "dispatchEvents");
  await repo.save(user);
  await expect(getUser(dbUser.id)).resolves.toEqual({
    id: user.id.toValue(),
    email: user.props.email,
    first_name: user.props.firstName,
    last_name: user.props.lastName,
    salt: user.props.salt,
    hash: user.props.hash
  });
  expect(user.dispatchEvents).toHaveBeenCalled();
});
