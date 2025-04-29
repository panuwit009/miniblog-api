CREATE SEQUENCE IF NOT EXISTS posts_id_seq
START 1;

CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY DEFAULT nextval('posts_id_seq'::regclass),
    title TEXT NOT NULL,
    content TEXT NOT NULL
);
