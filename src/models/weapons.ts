import { type } from 'os';
import client from '../database';

export type Weapon ={
    id: Number;
    name: string;
    type: string;
    weight: number;
}

export class WeaponStore{
    async index(): Promise<Weapon[]>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM weapons';
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`cannot get weapons ${err}`)
        }
    }

    async show(id: string): Promise<Weapon> {
        try {
        const sql = 'SELECT * FROM books WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`)
        }
      }

      async create(b: Weapon): Promise<Weapon> {
        try {
      const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [b.name, b.type, b.weight])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not add new book ${name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Weapon> {
        try {
      const sql = 'DELETE FROM books WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`)
        }
    }
}