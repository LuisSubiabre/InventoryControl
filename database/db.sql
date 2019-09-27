CREATE DATABASE database_links;

USE database_links;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

-- SUPPLIERS TABLE
CREATE TABLE suppliers (
    id INT(11) NOT NULL,
    description VARCHAR(150) NOT NULL,
    contact VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    adress VARCHAR(100) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_userSuppliers FOREIGN KEY(user_id) REFERENCES users(id)
);
ALTER TABLE suppliers
    ADD PRIMARY KEY (id);

ALTER TABLE suppliers
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- LOCATIONS TABLE
CREATE TABLE locations (
    id INT(11) NOT NULL,
    description VARCHAR(150) NOT NULL,
    photo VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
);
ALTER TABLE locations
    ADD PRIMARY KEY (id);

ALTER TABLE locations
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- CATEGORIES TABLE
CREATE TABLE categories (
    id INT(11) NOT NULL,
    name VARCHAR(150) NOT NULL,
    keyName VARCHAR(3) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);
ALTER TABLE categories
    ADD PRIMARY KEY (id);

ALTER TABLE categories
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;