import Client from '../database';

export type User = {
  id?: string;
  name: string;
  phone: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (name, phone) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.phone]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
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
