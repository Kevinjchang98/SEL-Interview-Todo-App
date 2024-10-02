-- Create a database todoapp if one doesn't already exist
SELECT 'CREATE DATBASE todoapp'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todoapp')\gexec

CREATE TABLE IF NOT EXISTS tasks
(
    id          serial PRIMARY KEY,
    title       varchar NOT NULL,
    description varchar,
    isComplete  boolean
);