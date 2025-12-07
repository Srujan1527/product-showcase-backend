import { query } from "../db/config";

export const getAllProductsService = async (
  search: string | undefined,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  const values: any[] = [];
  let where = "";

  if (search) {
    where = "WHERE LOWER(name) LIKE $1";
    values.push(`%${search.toLowerCase()}%`);
  }

  // total count
  const countResult = await query(
    `SELECT COUNT(*) AS total FROM products ${where}`,
    values
  );
  const total = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(total / limit);

  // fetch paginated list
  const listResult = await query(
    `
    SELECT * FROM products
    ${where}
    ORDER BY id ASC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `,
    [...values, limit, offset]
  );

  return {
    items: listResult.rows,
    total,
    totalPages,
    page,
  };
};

export const getProductByIdService = async (newId: number) => {
  const result = await query("SELECT * from products where id=$1", [newId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};
