import express from "express";
import {
  createEnquiryController,
  getAllEnquiriesController,
} from "./controller";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllEnquiriesController);
router.post("/", createEnquiryController);
export default router;
