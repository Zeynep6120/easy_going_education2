-- PostgreSQL schema for MODUL33 example
DROP TABLE IF EXISTS items;
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO items (title, description) VALUES
('Örnek madde 1','Bu bir demo öğedir.'),
('Örnek madde 2','İkinci demo öğe.');
