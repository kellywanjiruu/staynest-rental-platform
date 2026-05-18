import { pool } from "../config/db.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const sessionResult = await pool.query(
      `
      SELECT s.user_id, u.role
      FROM auth_sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token = $1 AND s.expires_at > NOW()
      LIMIT 1
      `,
      [token]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid or expired session." });
    }

    req.user = {
      id: sessionResult.rows[0].user_id,
      role: sessionResult.rows[0].role,
      token,
    };
    return next();
  } catch (error) {
    console.error("Auth middleware failed:", error.message);
    return res.status(500).json({ message: "Authentication failed." });
  }
};
