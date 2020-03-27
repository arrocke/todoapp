import User from "modules/users/User";
import { EntityIdentifier } from "core";
import { Pool } from "pg";
import * as mapUser from "modules/users/map-user";

/** Repository for working with users. */
export interface UserRepo {
  /**
   * Determines if a user exists.
   * @param email The email of the user.
   */
  exists(email: string): Promise<boolean>;

  /**
   * Finds a user by their email.
   * @param email The email of the user.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Finds a user by their identifier.
   * @param id The identifier of the user.
   */
  findById(id: EntityIdentifier): Promise<User | null>;

  /**
   * Saves a user to the database.
   * @param user The user to save.
   */
  save(user: User): Promise<void>;
}

export interface DbUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  salt: string;
  hash: string;
}

/** UserRepo connected to Postgresql. */
export class PostgresUserRepo implements UserRepo {
  private readonly _pool: Pool;

  constructor(pool: Pool) {
    this._pool = pool;
  }

  async exists(email: string): Promise<boolean> {
    const { rows } = await this._pool.query<{ count: number }>({
      text: `
        SELECT COUNT (1)
        FROM users
        WHERE email = $1;
      `,
      values: [email]
    });
    return rows[0].count === 1;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await this._pool.query<DbUser>({
      text: `
        SELECT id, email, first_name, last_name, salt, hash
        FROM users
        WHERE email = $1;
      `,
      values: [email]
    });
    if (rows[0]) {
      return mapUser.toEntity(rows[0]);
    } else {
      return null;
    }
  }

  async findById(id: EntityIdentifier): Promise<User> {
    const { rows } = await this._pool.query<DbUser>({
      text: `
        SELECT id, email, first_name, last_name, salt, hash
        FROM users
        WHERE id = $1;
      `,
      values: [id.toValue()]
    });
    if (rows[0]) {
      return mapUser.toEntity(rows[0]);
    } else {
      return null;
    }
  }

  async save(user: User): Promise<void> {
    const dbUser = mapUser.toDb(user);
    await this._pool.query<DbUser>({
      text: `
        INSERT INTO users(id, email, first_name, last_name, salt, hash)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id)
        DO UPDATE SET 
          email = $2,
          first_name = $3,
          last_name = $4,
          salt = $5,
          hash = $6;
      `,
      values: [
        dbUser.id,
        dbUser.email,
        dbUser.first_name,
        dbUser.last_name,
        dbUser.salt,
        dbUser.hash
      ]
    });
    user.dispatchEvents();
  }
}
