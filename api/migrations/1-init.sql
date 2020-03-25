CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  salt CHAR(16) NOT NULL,
  hash CHAR(128) NOT NULL
);