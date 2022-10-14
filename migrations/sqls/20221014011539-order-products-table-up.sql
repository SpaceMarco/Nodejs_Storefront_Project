CREATE TABLE order_products (
     id SERIAL PRIMARY KEY,
     quantity integer,
     order_id bigint REFERENCES orders(id),
     product_id bigInt REFERENCES products(id)
);