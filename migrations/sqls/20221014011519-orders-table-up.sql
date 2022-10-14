CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     status VARCHAR(64) NOT NULL,
     name VARCHAR(64) NOT NULL,
     user_id bigInt REFERENCES users(id)
);