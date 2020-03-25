import { Pool } from "pg";

export function getDb(): Pool {
  return new Pool({
    connectionString: "postgresql://adrian@localhost:5432/todoapp-test"
  });
}
