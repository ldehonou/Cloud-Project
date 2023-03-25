CREATE TABLE taches (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  etat BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO taches (nom, description, etat) VALUES
  ('Tâche 1', 'Description de la tâche 1', false),
  ('Tâche 2', 'Description de la tâche 2', true),
  ('Tâche 3', 'Description de la tâche 3', false);
