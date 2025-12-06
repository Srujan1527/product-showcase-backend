import { query } from "../db/config";

export interface CreateEnquiryInput {
  product_id: number;
  name: string;
  email: string;
  phone?: string | undefined;
  message: string;
}

export const getAllEnquiriesService = async () => {
  const result = await query("SELECT * from enquiries");

  return result;
};

export const createEnquiryService = async (body: CreateEnquiryInput) => {
  const { product_id, name, email, phone, message } = body;

  const sql = `INSERT INTO enquiries (product_id,name,email,phone,message)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id,product_id,name,email,phone,message,created_at;`;

  const params = [product_id, name, email, phone ?? null, message];

  const result = await query(sql, params);
  return result.rows[0];
};
