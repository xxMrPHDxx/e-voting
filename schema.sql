DROP DATABASE IF EXISTS `e-voting`;
CREATE DATABASE `e-voting`;
USE `e-voting`;

START TRANSACTION;

CREATE TABLE users (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(32) NOT NULL,
	username VARCHAR(32) UNIQUE NOT NULL,
	password VARCHAR(240) NOT NULL,
	public_key BLOB(500) NOT NULL,
	private_key BLOB(2000) NOT NULL,
	is_admin BOOLEAN NOT NULL
);

CREATE TABLE elections (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	title VARCHAR(100) NOT NULL,
	description TEXT NOT NULL
);

CREATE TABLE positions (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100) NOT NULL,
	election_id BIGINT NOT NULL,
	FOREIGN KEY (election_id) REFERENCES elections(id)
);

CREATE TABLE election_settings (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	count INT NOT NULL,
	election_id BIGINT NOT NULL,
	position_id BIGINT NOT NULL,
	FOREIGN KEY (election_id) REFERENCES elections(id),
	FOREIGN KEY (position_id) REFERENCES positions(id)
);

CREATE TABLE candidates (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100) NOT NULL,
	election_id BIGINT NOT NULL,
	position_id BIGINT NOT NULL,
	FOREIGN KEY (election_id) REFERENCES elections(id),
	FOREIGN KEY (position_id) REFERENCES positions(id)
);

CREATE TABLE votes (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	voter_id BIGINT NOT NULL,
	candidate_id BIGINT NOT NULL,
	FOREIGN KEY (voter_id) REFERENCES users(id),
	FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);

-- Blockchains
CREATE TABLE blockchains (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	difficulty INT NOT NULL DEFAULT 4
);

-- Blocks
CREATE TABLE blocks (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	blockchain_id BIGINT NOT NULL,
	FOREIGN KEY (blockchain_id) REFERENCES blockchains(id)
);

-- Transactions
CREATE TABLE transactions (
	id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	data BLOB(65535) NOT NULL,
	block_id BIGINT NOT NULL,
	FOREIGN KEY (block_id) REFERENCES blocks(id)
);

-- Administrator: password="admin"
INSERT INTO users (name, username, password, public_key, private_key, is_admin) VALUES (
	'Administrator',
	'admin',
	'$2b$10$EbsBhVHgMANbi/2zE8wdzeadlzVgwRjJgZqMT3Ypvd564YusBwVB.',
	'-----BEGIN PUBLIC KEY-----MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEO+TjKgQ03AcnXC0vYYuh6GTcONT1JY93IT+tH+Sc85LXo5L3LsbZ8eqhzDBHVtMhQF0eW4hargqZrz5QqYWCig==',
	'-----BEGIN EC PRIVATE KEY-----MHQCAQEEILRLa8eT/zlw970tUOJ60dHFPwBQHXG1XvOJydOofD97oAcGBSuBBAAKoUQDQgAEO+TjKgQ03AcnXC0vYYuh6GTcONT1JY93IT+tH+Sc85LXo5L3LsbZ8eqhzDBHVtMhQF0eW4hargqZrz5QqYWCig==-----END EC PRIVATE KEY-----',
	1
);

COMMIT;
