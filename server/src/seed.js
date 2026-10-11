import dotenv from "dotenv";
dotenv.config({ path: new URL("../.env", import.meta.url).pathname });
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const rows = [
  {
    slug: "chefs-table-ossiano",
    title: "Chef's Table at Ossiano",
    category: "Dining",
    area: "Palm Jumeirah",
    venue: "Atlantis The Royal",
    venueHost: "Ossiano",
    startsAt: new Date("2026-10-03T19:30:00+04:00"),
    capacity: 24,
    confirmed: 21,
    eligibleTracks: ["MEDIA", "TASTEMAKER"],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "spring-collection",
    title: "Spring Collection Launch",
    category: "Fashion",
    area: "Al Quoz",
    venue: "Alserkal Avenue",
    venueHost: "Maison Noura",
    startsAt: new Date("2026-10-04T20:00:00+04:00"),
    capacity: 120,
    confirmed: 120,
    eligibleTracks: ["CREATOR", "MEDIA"],
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "residence-preview",
    title: "Private Residence Preview",
    category: "Property",
    area: "Dubai Hills",
    venue: "Dubai Hills Estate",
    venueHost: "Vantage Developments",
    startsAt: new Date("2026-10-08T18:00:00+04:00"),
    capacity: 16,
    confirmed: 9,
    eligibleTracks: ["TASTEMAKER", "PRIVATE_CIRCLE"],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "sunset-listening",
    title: "Sunset Listening Session",
    category: "Music",
    area: "Bluewaters",
    venue: "Cove Beach",
    venueHost: "Nuvo Audio",
    startsAt: new Date("2026-10-11T17:30:00+04:00"),
    capacity: 80,
    confirmed: 54,
    eligibleTracks: ["CREATOR", "TASTEMAKER"],
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "collectors-night",
    title: "Collectors Night",
    category: "Art",
    area: "DIFC",
    venue: "Gate Village",
    venueHost: "Gallery Seventeen",
    startsAt: new Date("2026-10-16T19:00:00+04:00"),
    capacity: 40,
    confirmed: 28,
    eligibleTracks: ["MEDIA", "PRIVATE_CIRCLE"],
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=85",
  },
];
for (const event of rows)
  await db.event.upsert({
    where: { slug: event.slug },
    update: event,
    create: event,
  });
console.log(`Seeded ${rows.length} RSVP DXB events.`);
await db.$disconnect();
