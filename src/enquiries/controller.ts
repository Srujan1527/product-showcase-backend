import type { Request, Response } from "express";
import {
  getAllEnquiriesService,
  createEnquiryService,
  type CreateEnquiryInput,
} from "./service";

export const getAllEnquiriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAllEnquiriesService();
    if (!data) {
      return res.status(404).json({ message: "Enquiries not found" });
    }
    return res.status(200).json({ data });
  } catch (err) {
    console.error("Error in getAllEnquiresController:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch enquiries" });
  }
};

export const createEnquiryController = async (req: Request, res: Response) => {
  try {
    const { product_id, name, email, phone, message } =
      req.body as Partial<CreateEnquiryInput>;

    if (product_id === undefined || product_id === null) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const productNum = Number(product_id);

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "name is required" });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "message is required" });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ message: "email is required" });
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "email is not valid" });
    }

    const body: CreateEnquiryInput = {
      product_id: productNum,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.toString().trim(),
      message: message.trim(),
    };

    const created = await createEnquiryService(body);

    return res.status(201).json({
      message: "Enquiry created successfully",
      enquiry: created,
    });
  } catch (error) {
    console.error("Error in createEnquiryController:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to create enquiry" });
  }
};
