import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({
  connectionString,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
