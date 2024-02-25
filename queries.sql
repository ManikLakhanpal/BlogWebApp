-- CREATE TABLE --

CREATE TABLE posts (
	id SERIAL PRIMARY KEY UNIQUE,
	title VARCHAR(50),
	content VARCHAR(200),
	author VARCHAR(30),
	date VARCHAR(40)
);

-- ADD DATA --

INSERT INTO posts
VALUES (1, '1st Post', 'Lakhanpal Manik The Great.', 'Manik Lakhanapl', '03-02-2024');
