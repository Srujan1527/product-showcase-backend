import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server started successfully at port:${PORT}`);
});
