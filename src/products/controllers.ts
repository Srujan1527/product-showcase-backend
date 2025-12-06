import type { Request, Response } from "express";
import { getAllProductsService, getProductByIdService } from "./service";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const data = await getAllProductsService();
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ data });
  } catch (err) {
    console.error("Error in getAllProductsController:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newId = Number(id);

    const product = await getProductByIdService(newId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (err) {
    console.error("Error in getAllProductsController:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch products" });
  }
};
