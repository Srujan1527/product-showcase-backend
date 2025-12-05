import type { Request, Response } from "express";
import { getAllProductsService } from "./service.ts";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const data = await getAllProductsService();
    return res.status(200).json({ data });
  } catch (err) {
    console.error("Error in getAllProductsController:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch products" });
  }
};
