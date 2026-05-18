# StayNest – Short‑Term Rental Platform

**⚡️ Professional Airbnb‑style MVP** built with **Node.js**, **Express**, **PostgreSQL**, and **Vanilla JavaScript**.

---

## 🚀 Live Demos  

| Environment | URL | What you’ll see |
|-------------|-----|-----------------|
| **Vercel (Frontend‑only / Serverless API)** | <https://staynest-rental-platform.vercel.app/> | Full UI with demo listings, quick‑login demo buttons (host / guest). |
| **Render (Full‑stack service)** | <https://staynest-rental-platform.onrender.com/> | Same UI backed by a real Postgres instance. All API routes (`/api/*`) hit the live DB. |

> **Tip:** Both sites use the same seed data. Feel free to explore the host dashboard, add a property, and book a stay.

---

## 📦 Features (Phase 1)

- **Home page** – Property cards with images, price, amenities, and “View details” button.  
- **Authentication** – Sign‑in / register modal with quick‑login demo buttons.  
- **Dashboard Hub** – Host overview, listings manager, and reservation manager.  
- **Backend API** – CRUD endpoints for properties, bookings, and availability.  
- **Database schema** – Users, Properties, Bookings, Availability & many‑to‑many relations.  
- **Seed data** – Ready‑made demo listings (Kenyan apartments/villas) for instant testing.  

---

## 🛠️ Local Development

```bash
# 1️⃣ Clone & install
git clone https://github.com/kellywanjiruu/staynest-rental-platform.git
cd staynest-rental-platform
npm install

# 2️⃣ Environment variables
cp .env.example .env          # ← edit the file
# set DATABASE_URL to your local Postgres instance, e.g.
# DATABASE_URL=postgresql://user:password@localhost:5432/staynest

# 3️⃣ Database setup (run once)
psql $DATABASE_URL < db/schema.sql
psql $DATABASE_URL < db/seed.sql

# 4️⃣ Start the dev server
npm run dev
