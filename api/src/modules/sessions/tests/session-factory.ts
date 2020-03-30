import faker from "faker";
import { Pool } from "pg";
import { EntityIdentifier } from "core";
import Session from "modules/sessions/Session";
import { DbSession } from "modules/sessions/SessionRepo";

export interface SessionBuilderProps {
  id?: string;
  userId?: string;
}

export function buildSession({
  id = faker.random.uuid(),
  userId = faker.random.uuid()
}: SessionBuilderProps = {}): Session {
  return Session.create(
    { userId: new EntityIdentifier(userId) },
    new EntityIdentifier(id)
  ).value;
}

export function buildDbSession({
  id = faker.random.uuid(),
  user_id = faker.random.uuid()
}: Partial<DbSession> = {}): DbSession {
  return { id, user_id };
}

export async function insertDbSession(
  pool: Pool,
  overrides: Partial<DbSession> = {}
): Promise<DbSession> {
  const session = buildDbSession(overrides);
  await pool.query({
    text: "INSERT INTO sessions(id, user_id) VALUES($1, $2)",
    values: [session.id, session.user_id]
  });
  return session;
}

export async function findDbSession(
  pool: Pool,
  id: string
): Promise<DbSession> {
  const { rows } = await pool.query<DbSession>({
    text: "SELECT id, user_id FROM sessions WHERE id = $1",
    values: [id]
  });
  return rows[0];
}
