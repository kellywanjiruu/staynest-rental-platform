import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";
import { pool } from "./config/db.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import authRouter from "./routes/auth.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "..", "public");

async function initDb() {
  try {
    const res = await pool.query("SELECT to_regclass('public.users') as exists");
    if (!res.rows[0].exists) {
      console.log("Database tables missing. Creating schema...");
      const schema = fs.readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf8");
      await pool.query(schema);
    }
    
    console.log("Seeding database (idempotent)...");
    const seed = fs.readFileSync(path.join(__dirname, "..", "db", "seed.sql"), "utf8");
    await pool.query(seed);
    console.log("Database initialized/seeded successfully.");
  } catch (error) {
    console.error("Failed to check or initialize database:", error.message);
  }
}


// Call DB init
await initDb();

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
