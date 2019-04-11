DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS project;

--Trigger definition for automatic updated_at field.
CREATE OR REPLACE FUNCTION set_updated_at()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;   
END;
$$ language 'plpgsql';

--Project table
CREATE TABLE project(
  project_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER project_updated_at BEFORE UPDATE ON project FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

--Task table
CREATE TYPE task_state AS ENUM ('added', 'planned', 'in-progress', 'blocked', 'complete');
CREATE TABLE task(
  task_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  state task_state NOT NULL DEFAULT 'added',
  project_id INT REFERENCES project(project_id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER task_updated_at BEFORE UPDATE ON task FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
