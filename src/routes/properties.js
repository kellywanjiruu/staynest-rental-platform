import { Router } from "express";
import { pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT id, title, city, country, price_per_night, cover_image_url, max_guests
      FROM properties
      ORDER BY created_at DESC
      LIMIT 24
    `;
    const result = await pool.query(query);
    res.json({ properties: result.rows });
  } catch (error) {
    console.error("Failed to fetch properties:", error.message);
    res.status(500).json({ message: "Failed to fetch properties." });
  }
});

router.get("/host/:hostId", async (req, res) => {
  const hostId = Number(req.params.hostId);
  if (!Number.isInteger(hostId)) {
    return res.status(400).json({ message: "Invalid host id." });
  }

  try {
    const result = await pool.query(
      `
      SELECT id, title, city, country, price_per_night, max_guests, cover_image_url
      FROM properties
      WHERE host_id = $1
      ORDER BY created_at DESC
      `,
      [hostId]
    );
    return res.json({ properties: result.rows });
  } catch (error) {
    console.error("Failed to fetch host properties:", error.message);
    return res.status(500).json({ message: "Failed to fetch host properties." });
  }
});

router.post("/host/:hostId", requireAuth, async (req, res) => {
  const hostId = Number(req.params.hostId);
  const { title, description, city, country, pricePerNight, maxGuests, coverImageUrl } = req.body;

  if (!Number.isInteger(hostId)) {
    return res.status(400).json({ message: "Invalid host id." });
  }

  if (req.user.role !== "host" || req.user.id !== hostId) {
    return res.status(403).json({ message: "Only the signed-in host can create listings." });
  }

  if (!title || !description || !city || !country || !pricePerNight || !maxGuests) {
    return res.status(400).json({ message: "title, description, city, country, pricePerNight, maxGuests are required." });
  }

  try {
    const query = `
      INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, title, city, country, price_per_night, max_guests, cover_image_url
    `;
    const values = [hostId, title, description, city, country, Number(pricePerNight), Number(maxGuests), coverImageUrl || null];
    const result = await pool.query(query, values);
    return res.status(201).json({ property: result.rows[0] });
  } catch (error) {
    console.error("Failed to create property:", error.message);
    return res.status(500).json({ message: "Failed to create property." });
  }
});

router.get("/:propertyId/availability", async (req, res) => {
  const propertyId = Number(req.params.propertyId);
  const { checkIn, checkOut } = req.query;

  if (!Number.isInteger(propertyId)) {
    return res.status(400).json({ message: "Invalid property id." });
  }

  if (!checkIn || !checkOut) {
    return res.status(400).json({ message: "checkIn and checkOut are required." });
  }

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return res.status(400).json({ message: "checkIn and checkOut must be valid dates (YYYY-MM-DD)." });
  }

  if (d2 <= d1) {
    return res.status(400).json({ message: "checkOut must be after checkIn." });
  }

  try {
    const bookingConflictQuery = `
      SELECT 1
      FROM bookings
      WHERE property_id = $1
        AND status IN ('confirmed', 'pending')
        AND check_in < $3::date
        AND check_out > $2::date
      LIMIT 1
    `;
    const bookingConflict = await pool.query(bookingConflictQuery, [propertyId, checkIn, checkOut]);

    if (bookingConflict.rows.length > 0) {
      return res.json({ isAvailable: false, reason: "Already booked for selected dates." });
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
    const blockedDates = await pool.query(blockedDatesQuery, [propertyId, checkIn, checkOut]);

    if (blockedDates.rows.length > 0) {
      return res.json({ isAvailable: false, reason: "Host blocked one or more dates." });
    }

    return res.json({ isAvailable: true });
  } catch (error) {
    console.error("Failed to check availability:", error.message);
    return res.status(500).json({ message: "Failed to check availability." });
  }
});

router.post("/:propertyId/block-dates", requireAuth, async (req, res) => {
  const propertyId = Number(req.params.propertyId);
  const { startDate, endDate } = req.body;

  if (!Number.isInteger(propertyId)) {
    return res.status(400).json({ message: "Invalid property id." });
  }

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "startDate and endDate are required." });
  }

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return res.status(400).json({ message: "startDate and endDate must be valid dates (YYYY-MM-DD)." });
  }

  if (d2 <= d1) {
    return res.status(400).json({ message: "endDate must be after startDate." });
  }

  try {
    const ownerResult = await pool.query("SELECT host_id FROM properties WHERE id = $1 LIMIT 1", [propertyId]);
    if (ownerResult.rows.length === 0) {
      return res.status(404).json({ message: "Property not found." });
    }

    if (req.user.role !== "host" || Number(ownerResult.rows[0].host_id) !== req.user.id) {
      return res.status(403).json({ message: "Only the listing host can block dates." });
    }

    const query = `
      INSERT INTO availability (property_id, day, is_available)
      SELECT $1, day::date, FALSE
      FROM generate_series($2::date, ($3::date - INTERVAL '1 day'), INTERVAL '1 day') AS day
      ON CONFLICT (property_id, day)
      DO UPDATE SET is_available = EXCLUDED.is_available
    `;
    await pool.query(query, [propertyId, startDate, endDate]);
    return res.status(201).json({ message: "Dates blocked successfully." });
  } catch (error) {
    console.error("Failed to block dates:", error.message);
    return res.status(500).json({ message: "Failed to block dates." });
  }
});

export default router;
