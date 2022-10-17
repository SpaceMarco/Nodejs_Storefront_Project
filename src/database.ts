import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_DB } = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
});

export default client;