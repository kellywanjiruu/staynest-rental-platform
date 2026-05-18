import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "..", "public");

app.use(cors());
app.use(express.json());
app.use(express.static(publicDirectory));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running." });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
