import { query } from "../db/config";

export const getAllProductsService = async () => {
  const result = await query("SELECT * from products");
  return result.rows.length > 0 ? result.rows : null;
};

export const getProductByIdService = async (newId: number) => {
  const result = await query("SELECT * from products where id=$1", [newId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};
