# StayNest – Short-Term Rental Platform

**⚡️ Professional Airbnb-style MVP** built with **Node.js**, **Express**, **PostgreSQL**, and **Vanilla JavaScript**.

---

## 🚀 Live Demos  

| Environment | URL | What you’ll see |
|-------------|-----|-----------------|
| **Vercel (Frontend-only / Serverless API)** | <https://staynest-rental-platform.vercel.app/> | Full UI with demo listings, quick-login demo buttons (host / guest). |
| **Render (Full-stack service)** | <https://staynest-rental-platform.onrender.com/> | Same UI backed by a real Postgres instance. All API routes (`/api/*`) hit the live DB. |

> **Tip:** Both sites use the same seed data. Feel free to explore the host dashboard, add a property, and book a stay.

---

## 📦 Features (Phase 1)

- **Home page** – Property cards with images, price, amenities, and “View details” button.  
- **Authentication** – Sign-in / register modal with quick-login demo buttons.  
- **Dashboard Hub** – Host overview, listings manager, and reservation manager.  
- **Backend API** – CRUD endpoints for properties, bookings, and availability.  
- **Database schema** – Users, Properties, Bookings, Availability & many-to-many relations.  
- **Seed data** – Ready-made demo listings (Kenyan apartments/villas) for instant testing.  

---

## 🛠️ Local Development

```bash
# 1️⃣ Clone & install
git clone https://github.com/kellywanjiruu/staynest-rental-platform.git
cd staynest-rental-platform
npm install

# 2️⃣ Create the PostgreSQL database (run once)
createdb staynest

# 3️⃣ Configure environment variables
cp .env.example .env
# Edit .env and set DATABASE_URL to your local PostgreSQL connection, e.g.
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/staynest

# 4️⃣ Start the development server
npm run dev
```

**Database initialization:** On startup, the server checks whether the database tables exist. If they do not, it creates them from `db/schema.sql`. It then runs `db/seed.sql` to insert the demo users and listings.

**Optional manual setup:** If you prefer to initialize the database yourself, run these commands after creating the database and configuring `DATABASE_URL`:

```bash
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql
```
