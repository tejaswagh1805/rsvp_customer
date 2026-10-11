# RSVP DXB platform

JavaScript monorepo for the RSVP DXB invitation platform. The client uses React 18 + Vite; the API uses Node.js + Express; persistence is PostgreSQL on Neon through Prisma.

## Requirements
- Node.js 20+
- npm 10+
- Neon PostgreSQL connection string

## Setup
1. In this directory run `npm install`.
2. Copy `server/.env.example` to `server/.env` and replace `DATABASE_URL` with your Neon connection string. Keep `?sslmode=require`.
3. Run `npm run prisma:generate --workspace server`.
4. Run `npm run prisma:migrate --workspace server -- --name init`.
5. Seed the example events with `npm run seed --workspace server`.
6. Start both apps using `npm run dev`.
7. Open http://localhost:5173. API health check: http://localhost:4000/api/health.

## Current phase
The landing page and event listing are implemented with demo content, responsive layout, theme switching, motion effects, and a JS/Express API base. Register/login, RSVP persistence, host flow, staff/admin, door check-in, and remaining content routes are planned next. Event images and design tokens are assumed from the supplied brief; compare against the Lovable preview before claiming pixel parity.
