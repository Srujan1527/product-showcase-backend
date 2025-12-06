import express from "express";
import {
  createEnquiryController,
  getAllEnquiriesController,
} from "./controller";

const router = express.Router();

router.get("/", getAllEnquiriesController);
router.post("/", createEnquiryController);
export default router;
