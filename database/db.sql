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
    lastCode int(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp
);
ALTER TABLE categories
    ADD PRIMARY KEY (id);

ALTER TABLE categories
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

 -- INVENTORY TABLE
CREATE TABLE inventory (
    id INT(11) NOT NULL,
    name VARCHAR(150) NOT NULL,
    serialNumber VARCHAR(150) NOT NULL,
    invoice VARCHAR(150) NOT NULL,
    keyName VARCHAR(3) NOT NULL,
    numCode int(11) NOT NULL,
    brand VARCHAR(10) NOT NULL,
    photo VARCHAR(255),
    status VARCHAR(255),
    user_id INT(11),
    categorie_id INT(11),
    supplier_id INT(11),
    location_id INT(11),
    status_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_userInventory FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_categoriesInventory FOREIGN KEY(categorie_id) REFERENCES categories(id),
    CONSTRAINT fk_suppliersInventory FOREIGN KEY(supplier_id) REFERENCES suppliers(id),
    CONSTRAINT fk_locationsInventory FOREIGN KEY(location_id) REFERENCES locations(id),
    CONSTRAINT fk_statusInventory FOREIGN KEY(status_id) REFERENCES status(id)
);
ALTER TABLE inventory
    ADD PRIMARY KEY (id);

ALTER TABLE inventory
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- STATUS TABLE
CREATE TABLE status (
    id INT(11) NOT NULL,
    description VARCHAR(150) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);
ALTER TABLE status
    ADD PRIMARY KEY (id);

ALTER TABLE status
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
