import type { Request, Response } from "express";
import { getAllProductsService, getProductByIdService } from "./service";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 6;

    const result = await getAllProductsService(search, page, limit);

    return res.status(200).json({
      data: result.items,
      pagination: {
        total: result.total,
        totalPages: result.totalPages,
        page: result.page,
        limit: limit,
      },
    });
  } catch (err) {
    console.error("Error in getAllProductsController:", err);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
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
