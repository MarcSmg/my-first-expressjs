CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, content) VALUES
('First Note', 'This is the content of the first note.'),
('Second Note', 'This is the content of the second note.');