import dotenv from "dotenv";
dotenv.config({ path: new URL("../.env", import.meta.url).pathname });
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const app = express(),
  db = new PrismaClient(),
  port = Number(process.env.PORT || 4000);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "rsvp-dxb-api" }),
);
app.get("/api/events", async (req, res) => {
  const { category, area, sort } = req.query;
  try {
    const where = {
      ...(category && category !== "All" ? { category: String(category) } : {}),
      ...(area && area !== "All areas" ? { area: String(area) } : {}),
    };
    let rows = await db.event.findMany({
      where,
      orderBy: { startsAt: sort === "Newest" ? "desc" : "asc" },
    });
    if (sort === "Few places left")
      rows.sort(
        (a, b) => a.capacity - a.confirmed - (b.capacity - b.confirmed),
      );
    res.json(rows);
  } catch {
    res
      .status(503)
      .json({
        error:
          "Database unavailable. Set DATABASE_URL and run Prisma migrations.",
      });
  }
});
app.get("/api/events/:slug", async (req, res) => {
  try {
    const row = await db.event.findUnique({ where: { slug: req.params.slug } });
    if (!row) return res.status(404).json({ error: "Event not found" });
    res.json(row);
  } catch {
    res.status(503).json({ error: "Database unavailable" });
  }
});
app.post("/api/newsletter", async (req, res) => {
  const parsed = z.object({ email: z.string().email() }).safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: "Enter a valid email address" });
  try {
    await db.newsletterSubscriber.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      update: {},
      create: { email: parsed.data.email.toLowerCase() },
    });
    res.status(201).json({ ok: true });
  } catch {
    res.status(503).json({ error: "Database unavailable. Try again later." });
  }
});
app.post("/api/host-inquiry", async (req, res) => {
  const parsed = z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      whatsapp: z.string().min(5),
      occasion: z.string().min(1),
      package: z.string().min(1),
      date: z.string().optional(),
      guests: z.coerce.number().int().positive().optional(),
      area: z.string().optional(),
    })
    .safeParse(req.body);
  if (!parsed.success)
    return res
      .status(400)
      .json({ error: "Please complete the required fields" });
  try {
    const inquiry = await db.hostInquiry.create({
      data: {
        ...parsed.data,
        date: parsed.data.date ? new Date(parsed.data.date) : undefined,
      },
    });
    res.status(201).json({ ok: true, id: inquiry.id });
  } catch {
    res.status(503).json({ error: "Database unavailable" });
  }
});
app.listen(port, () =>
  console.log(`RSVP DXB API listening on http://localhost:${port}`),
);
