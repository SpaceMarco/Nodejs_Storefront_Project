import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { userInfo } from 'os';
import { resourceLimits } from 'worker_threads';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
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
      const sql =
        'INSERT INTO users (first_name, last_name, phone, password) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const hash = bcrypt.hashSync(
        b.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        b.first_name,
        b.last_name,
        b.phone,
        hash,
      ]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.first_name}. Error: ${err}`);
    }
  }

  async authenticate_hash(
    phone: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT password from users Where phone=($1)';

    const res = await conn.query(sql, [phone]);

    console.log(password + pepper);

    if (res.rows.length) {
      const user = res.rows[0];
      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
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
