import { Router } from "express";
import { pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/my", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT b.id, b.property_id, b.check_in, b.check_out, b.total_price, b.status, b.created_at,
             p.title AS property_title, p.city, p.country
      FROM bookings b
      JOIN properties p ON p.id = b.property_id
      WHERE b.guest_id = $1
      ORDER BY b.created_at DESC
      `,
      [req.user.id]
    );
    return res.json({ bookings: result.rows });
  } catch (error) {
    console.error("Failed to fetch guest bookings:", error.message);
    return res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

router.get("/host", requireAuth, async (req, res) => {
  if (req.user.role !== "host") {
    return res.status(403).json({ message: "Host account required." });
  }

  try {
    const result = await pool.query(
      `
      SELECT b.id, b.property_id, b.check_in, b.check_out, b.total_price, b.status, b.created_at,
             b.guest_id, p.title AS property_title, p.city, p.country, u.full_name AS guest_name
      FROM bookings b
      JOIN properties p ON p.id = b.property_id
      LEFT JOIN users u ON u.id = b.guest_id
      WHERE p.host_id = $1
      ORDER BY b.created_at DESC
      `,
      [req.user.id]
    );
    return res.json({ bookings: result.rows });
  } catch (error) {
    console.error("Failed to fetch host bookings:", error.message);
    return res.status(500).json({ message: "Failed to fetch host bookings." });
  }
});

router.patch("/:bookingId/status", requireAuth, async (req, res) => {
  const bookingId = Number(req.params.bookingId);
  const { status } = req.body;

  if (!Number.isInteger(bookingId)) {
    return res.status(400).json({ message: "Invalid booking id." });
  }

  if (!["confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "status must be confirmed or cancelled." });
  }

  try {
    const ownershipResult = await pool.query(
      `
      SELECT b.id
      FROM bookings b
      JOIN properties p ON p.id = b.property_id
      WHERE b.id = $1 AND p.host_id = $2
      LIMIT 1
      `,
      [bookingId, req.user.id]
    );

    if (ownershipResult.rows.length === 0) {
      return res.status(403).json({ message: "Only the listing host can update this booking." });
    }

    const updateResult = await pool.query(
      `
      UPDATE bookings
      SET status = $2
      WHERE id = $1
      RETURNING id, status
      `,
      [bookingId, status]
    );
    return res.json({ booking: updateResult.rows[0] });
  } catch (error) {
    console.error("Failed to update booking status:", error.message);
    return res.status(500).json({ message: "Failed to update booking status." });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { propertyId, checkIn, checkOut } = req.body;
  const guestId = req.user.id;

  if (!propertyId || !checkIn || !checkOut) {
    return res.status(400).json({ message: "propertyId, checkIn, checkOut are required." });
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    return res.status(400).json({ message: "checkIn and checkOut must be valid dates (YYYY-MM-DD)." });
  }

  if (outDate <= inDate) {
    return res.status(400).json({ message: "checkOut must be after checkIn." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const priceResult = await client.query("SELECT price_per_night FROM properties WHERE id = $1", [propertyId]);
    if (priceResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Property not found." });
    }

    const conflictQuery = `
      SELECT 1
      FROM bookings
      WHERE property_id = $1
        AND status IN ('confirmed', 'pending')
        AND check_in < $3::date
        AND check_out > $2::date
      LIMIT 1
    `;
    const conflictResult = await client.query(conflictQuery, [propertyId, checkIn, checkOut]);
    if (conflictResult.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(409).json({ message: "Selected dates are no longer available." });
    }

    const blockedDatesQuery = `
      SELECT 1
      FROM availability
      WHERE property_id = $1
        AND day >= $2::date
        AND day < $3::date
        AND is_available = FALSE
      LIMIT 1
    `;
    const blockedDatesResult = await client.query(blockedDatesQuery, [propertyId, checkIn, checkOut]);
    if (blockedDatesResult.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(409).json({ message: "Host has blocked one or more selected dates." });
    }

    const nightsResult = await client.query("SELECT ($2::date - $1::date) AS nights", [checkIn, checkOut]);
    const nights = Number(nightsResult.rows[0].nights);
    if (!Number.isFinite(nights) || nights <= 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "checkOut must be after checkIn." });
    }

    const nightlyPrice = Number(priceResult.rows[0].price_per_night);
    const basePrice = nights * nightlyPrice;
    const cleaningFee = 1500;
    const serviceFee = Math.round(basePrice * 0.08);
    const taxPrice = Math.round((basePrice + cleaningFee + serviceFee) * 0.16);
    const totalPrice = basePrice + cleaningFee + serviceFee + taxPrice;

    const insertQuery = `
      INSERT INTO bookings (property_id, guest_id, check_in, check_out, total_price, status)
      VALUES ($1, $2, $3::date, $4::date, $5, 'confirmed')
      RETURNING id, property_id, guest_id, check_in, check_out, total_price, status, created_at
    `;
    const insertResult = await client.query(insertQuery, [propertyId, guestId, checkIn, checkOut, totalPrice]);

    await client.query("COMMIT");
    return res.status(201).json({ booking: insertResult.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to create booking:", error.message);
    return res.status(500).json({ message: "Failed to create booking." });
  } finally {
    client.release();
  }
});

export default router;
