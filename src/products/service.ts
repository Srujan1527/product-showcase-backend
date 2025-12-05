import { query } from "../db/config.ts";

export const getAllProductsService = async () => {
  const result = await query("SELECT * from products");
  return result.rows;
};
