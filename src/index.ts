import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { query } from "./db/config";
import productsRouter from "./products/routes";
import enquiriesRouter from "./enquiries/routes";
import authRouter from "./auth/routes";
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());

app.get("/health", async (req, res) => {
  try {
    await query("SELECT 1");
    res.json({ status: "ok", db: "Connected" });
  } catch (err) {
    console.error("DB Health check failed", err);
    res.status(500).json({ status: "error", db: "not_connected" });
  }
});

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/enquiries", enquiriesRouter);
app.use("/api/v1/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server started successfully at port:${PORT}`);
});
