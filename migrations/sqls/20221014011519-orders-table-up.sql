CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     status VARCHAR(64) NOT NULL,
     user_id bigInt REFERENCES users(id),
     order_date date
);