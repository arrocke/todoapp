import Session from "modules/sessions/Session";
import { EntityIdentifier } from "core";
import { Pool } from "pg";
import * as mapSession from "modules/sessions/map-session";

export interface SessionRepo {
  exists(id: EntityIdentifier): Promise<boolean>;
  findById(id: EntityIdentifier): Promise<Session>;
  save(session: Session): Promise<void>;
  delete(id: EntityIdentifier): Promise<void>;
}

export interface DbSession {
  id: string;
  user_id: string;
}

export default class PostgresSessionRepo implements SessionRepo {
  private readonly _pool: Pool;

  constructor(pool: Pool) {
    this._pool = pool;
  }

  async exists(id: EntityIdentifier): Promise<boolean> {
    const { rows } = await this._pool.query<{ count: number }>({
      text: `
        SELECT COUNT (1)
        FROM sessions
        WHERE id = $1;
      `,
      values: [id.toValue()]
    });
    return rows[0].count === 1;
  }

  async findById(id: EntityIdentifier): Promise<Session> {
    const { rows } = await this._pool.query<DbSession>({
      text: `
        SELECT id, userId
        FROM sessions
        WHERE id = $1;
      `,
      values: [id.toValue()]
    });
    if (rows[0]) {
      return mapSession.toEntity(rows[0]);
    } else {
      return null;
    }
  }

  async save(session: Session): Promise<void> {
    const dbSession = mapSession.toDb(session);
    await this._pool.query<DbSession>({
      text: `
        INSERT INTO sessions(id, userId)
        VALUES($1, $2)
        ON CONFLICT (id)
        DO UPDATE SET
          userId = $2,
      `,
      values: [dbSession.id, dbSession.userId]
    });
    session.dispatchEvents();
  }

  async delete(id: EntityIdentifier): Promise<void> {
    await this._pool.query<DbSession>({
      text: `
        DELETE FROM sessions
        WHERE id = $1
      `,
      values: [id.toValue()]
    });
  }
}
