-- Make sure that the database name is the same as in the .env file
CREATE DATABASE IF NOT EXISTS assessment;
USE assessment;

-- Make sure that user name and password as the same as in the .env file
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON assessment.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

CREATE TABLE products (
  sku VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  type ENUM('DVD', 'Book', 'Furniture') NOT NULL,
  PRIMARY KEY (sku)
);

CREATE TABLE dvd_products (
  sku VARCHAR(255) NOT NULL,
  size INT NOT NULL,
  PRIMARY KEY (sku),
  CONSTRAINT fk_dvd_product FOREIGN KEY (sku) REFERENCES products(sku) ON DELETE CASCADE
);
  

CREATE TABLE book_products (
  sku VARCHAR(255) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (sku),
  CONSTRAINT fk_book_product FOREIGN KEY (sku) REFERENCES products(sku) ON DELETE CASCADE
);
  

CREATE TABLE furniture_products (
  sku VARCHAR(255) NOT NULL,
  height DECIMAL(10,2) NOT NULL,
  width DECIMAL(10,2) NOT NULL,
  length DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (sku),
  CONSTRAINT fk_furniture_product FOREIGN KEY (sku) REFERENCES products(sku) ON DELETE CASCADE
);

  
-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-001', 'The Matrix DVD', 9.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-001', 120);


-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-001', 'The Catcher in the Rye Book', 5.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-001', 0.7);

-- Inserting a furniture product
INSERT INTO products (sku, name, price, type) VALUES ('FURNITURE-001', 'IKEA Table', 49.99, 'Furniture');
INSERT INTO furniture_products (sku, height, width, length) VALUES ('FURNITURE-001', 70, 120, 80);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-002', 'The Lord of the Rings DVD Set', 24.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-002', 300);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-002', 'To Kill a Mockingbird Book', 8.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-002', 0.9);

-- Inserting a furniture product
INSERT INTO products (sku, name, price, type) VALUES ('FURNITURE-002', 'Leather Recliner', 399.99, 'Furniture');
INSERT INTO furniture_products (sku, height, width, length) VALUES ('FURNITURE-002', 90, 80, 100);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-003', 'The Godfather DVD', 11.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-003', 180);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-003', '1984 Book', 7.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-003', 0.6);

-- Inserting a furniture product
INSERT INTO products (sku, name, price, type) VALUES ('FURNITURE-003', 'Glass Coffee Table', 99.99, 'Furniture');
INSERT INTO furniture_products (sku, height, width, length) VALUES ('FURNITURE-003', 50, 100, 50);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-004', 'Forrest Gump DVD', 8.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-004', 130);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-004', 'Pride and Prejudice Book', 6.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-004', 0.5);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-005', 'Inception DVD', 10.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-005', 160);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-005', 'The Alchemist Book', 9.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-005', 0.8);

-- Inserting a furniture product
INSERT INTO products (sku, name, price, type) VALUES ('FURNITURE-004', 'Sofa Bed', 299.99, 'Furniture');
INSERT INTO furniture_products (sku, height, width, length) VALUES ('FURNITURE-004', 60, 160, 100);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-006', 'Star Wars Trilogy DVD Set', 29.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-006', 400);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-006', 'The Hobbit Book', 7.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-006', 0.6);

-- Inserting a furniture product
INSERT INTO products (sku, name, price, type) VALUES ('FURNITURE-005', 'Armchair', 149.99, 'Furniture');
INSERT INTO furniture_products (sku, height, width, length) VALUES ('FURNITURE-005', 80, 70, 70);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-007', 'The Dark Knight DVD', 9.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-007', 140);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-007', 'The Great Gatsby Book', 6.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-007', 0.5);

-- Inserting a furniture product
INSERT INTO products (sku, name, price, type) VALUES ('FURNITURE-006', 'Bed Frame', 199.99, 'Furniture');
INSERT INTO furniture_products (sku, height, width, length) VALUES ('FURNITURE-006', 100, 160, 200);

-- Inserting a DVD product
INSERT INTO products (sku, name, price, type) VALUES ('DVD-008', 'Jurassic Park DVD', 7.99, 'DVD');
INSERT INTO dvd_products (sku, size) VALUES ('DVD-008', 130);

-- Inserting a book product
INSERT INTO products (sku, name, price, type) VALUES ('BOOK-008', 'The Odyssey Book', 8.99, 'Book');
INSERT INTO book_products (sku, weight) VALUES ('BOOK-008', 0.7);