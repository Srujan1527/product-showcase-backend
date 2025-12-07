import express from "express";
import { loginController, signUpController } from "./controller";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

export default router;
