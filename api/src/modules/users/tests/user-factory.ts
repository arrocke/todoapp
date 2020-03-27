import faker from "faker";
import crypto from "crypto";
import { EntityIdentifier } from "core";
import User from "modules/users/User";
import { DbUser } from "modules/users/UserRepo";
import { Pool } from "pg";

function sha512(salt: string, password: string): string {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
}

export interface UserBuilderProps {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  salt?: string;
  hash?: string;
}

export function buildUser({
  id = faker.random.uuid(),
  password = faker.internet.password(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  email = faker.internet.email(),
  salt = crypto.randomBytes(8).toString("hex"),
  hash = sha512(salt, password)
}: UserBuilderProps = {}): User {
  const props = { firstName, lastName, email, salt, hash };
  return User.create(props, new EntityIdentifier(id)).value;
}

export function buildDbUser({
  id = faker.random.uuid(),
  first_name = faker.name.firstName(),
  last_name = faker.name.lastName(),
  email = faker.internet.email(),
  salt = faker.random.alphaNumeric(16),
  hash = faker.random.alphaNumeric(128)
}: Partial<DbUser> = {}): DbUser {
  return { id, first_name, last_name, email, salt, hash };
}

export async function insertDbUser(
  pool: Pool,
  overrides: Partial<DbUser> = {}
): Promise<DbUser> {
  const user = buildDbUser(overrides);
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

export async function findDbUser(pool: Pool, id: string): Promise<DbUser> {
  const { rows } = await pool.query<DbUser>({
    text:
      "SELECT id, email, first_name, last_name, salt, hash FROM users WHERE id = $1",
    values: [id]
  });
  return rows[0];
}
