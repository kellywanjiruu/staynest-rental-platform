import { Router } from "express";
import crypto from "crypto";
import { pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const scryptAsync = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey.toString("hex"));
    });
  });

const hashPassword = async (plainPassword) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await scryptAsync(plainPassword, salt);
  return `scrypt$${salt}$${hash}`;
};

const verifyPassword = async (plainPassword, storedValue) => {
  if (!storedValue.includes("$")) {
    return plainPassword === storedValue;
  }

  const [algorithm, salt, hash] = storedValue.split("$");
  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const checkHash = await scryptAsync(plainPassword, salt);
  const bufA = Buffer.from(checkHash, "hex");
  const bufB = Buffer.from(hash, "hex");

  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
};

router.post("/register", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "fullName, email, password are required." });
  }

  const normalizedRole = role === "host" ? "host" : "guest";

  try {
    const passwordHash = await hashPassword(password);
    const result = await pool.query(
      `
      INSERT INTO users (full_name, email, password_hash, role)
      VALUES ($1, LOWER($2), $3, $4)
      RETURNING id, full_name, email, role
      `,
      [fullName, email, passwordHash, normalizedRole]
    );
    return res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: "Email is already registered." });
    }
    console.error("Register failed:", error.message);
    return res.status(500).json({ message: `Registration failed: ${error.message}` });
  }

});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required." });
  }

  try {
    const userResult = await pool.query(
      `
      SELECT id, full_name, email, role, password_hash
      FROM users
      WHERE email = LOWER($1)
      LIMIT 1
      `,
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = userResult.rows[0];
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await pool.query(
      `
      INSERT INTO auth_sessions (user_id, token, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '7 days')
      `,
      [user.id, token]
    );

    return res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (String(error.message).toLowerCase().includes("auth_sessions")) {
      return res.status(500).json({ message: "Auth table missing. Run db/schema.sql then retry." });
    }
    console.error("Login failed:", error.message);
    return res.status(500).json({ message: "Login failed." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, role FROM users WHERE id = $1 LIMIT 1",
      [req.user.id]
    );
    return res.json({ user: result.rows[0] || null });
  } catch (error) {
    console.error("Failed to fetch user profile:", error.message);
    return res.status(500).json({ message: "Failed to fetch user profile." });
  }
});

router.post("/logout", requireAuth, async (req, res) => {
  try {
    await pool.query("DELETE FROM auth_sessions WHERE token = $1", [req.user.token]);
    return res.json({ message: "Logged out." });
  } catch (error) {
    console.error("Logout failed:", error.message);
    return res.status(500).json({ message: "Logout failed." });
  }
});

export default router;
