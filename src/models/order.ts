import Client from '../database';

export type Order_products = {
  id?: string;
  quantity: number;
  orderId: string;
  productId: string;
};
export type Order = {
  id?: string;
  status: string;
  usrID: string;
  date: Date;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }

  async show_orders_prod(): Promise<Order_products[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1) and status="active"';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id, order_date) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [b.status, b.usrID, b.date]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.date}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
