-- CREATE TABLE --

CREATE TABLE posts (
	id SERIAL PRIMARY KEY UNIQUE,
	title VARCHAR(50),
	content VARCHAR(200),
	author VARCHAR(30),
	date VARCHAR(40)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ADD DATA --

INSERT INTO posts
VALUES (1, '1st Post', 'Lakhanpal Manik The Great.', 'Manik Lakhanapl', '03-02-2024');

INSERT INTO users
VALUES(1, "admin", "admin@gmail.com", "admin123");