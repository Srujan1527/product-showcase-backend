import express from "express";
import { getAllProductsController } from "./controllers.ts";

const router = express.Router();

router.get("/", getAllProductsController);

export default router;
