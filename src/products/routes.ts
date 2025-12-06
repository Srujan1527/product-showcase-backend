import express from "express";
import { getAllProductsController, getProductById } from "./controllers";

const router = express.Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductById);

export default router;
