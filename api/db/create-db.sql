DROP TABLE project;

-- Trigger definition for automatic updated_at field.
CREATE OR REPLACE FUNCTION set_updated_at()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;   
END;
$$ language 'plpgsql';


CREATE TABLE project(
  project_id serial PRIMARY KEY,
  name VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER project_updated_at BEFORE UPDATE ON project FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
