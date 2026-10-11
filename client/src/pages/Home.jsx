import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Instagram,
  Play,
  Send,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import ScrollPanels from "../components/ScrollPanels.jsx";
import Reveal from "../components/Reveal.jsx";
import { events } from "../data/events.js";
const panels = [
  [
    "PEOPLE WORTH KNOWING",
    "MAKE YOUR NEXT\nCONNECTION.",
    "photo-1528605248644-14dd04022da1",
  ],
  [
    "CREATORS. CULTURE. COMMUNITY.",
    "NOT JUST\nANOTHER INVITE.",
    "photo-1514525253161-7a46d19cd819",
  ],
  [
    "A DIFFERENT POINT OF VIEW",
    "FRONT ROW.\nYOUR WAY.",
    "photo-1492684223066-81342ee5ff30",
  ],
  [
    "MEET US IN THE ROOM",
    "THIS IS YOUR\nKIND OF CITY.",
    "photo-1511795409834-ef04bbd61622",
  ],
];
const gallery = [
  ["Dining", "photo-1414235077428-338989a2e8c0", "A table worth sharing"],
  ["Fashion", "photo-1539109136881-3be0616acf4b", "The new season, first"],
  ["Property", "photo-1600210492486-724fe5c67fb0", "A private perspective"],
  ["Music", "photo-1470229722913-7c0e2dbbafd3", "After the sun goes down"],
  ["Art", "photo-1579783902614-a3fb3927b6a5", "Collectors in good company"],
  ["Dining", "photo-1517248135467-4c7edcad34c4", "An evening at the pass"],
];
const artists = [
  ["DJ / Sound & culture","THE SELECTOR","photo-1571266028243-d220c9c3b5a1"],
  ["Artist / Live sessions","THE STORYTELLER","photo-1531058020387-3be344556be6"],
  ["Fashion / Digital culture","THE CREATOR","photo-1529139574466-a303027c1d8b"],
];
function Heading({ eyebrow, title, link }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" to={link}>
          All events <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
function Marquee({ spotlight = false }) {
  const list = spotlight ? events.filter((event) => event.featured) : events;
  return (
    <div className={`event-marquee ${spotlight ? "spotlight-marquee" : ""}`}>
      <div className="marquee-track">
        {[...list, ...list].map((event, i) => (
          <div className="marquee-item" key={`${event.slug}-${i}`}>
            <EventCard event={event} index={i % list.length} compact />
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Home() {
  const [filter, setFilter] = useState("All"),
    [email, setEmail] = useState(""),
    [subscribed, setSubscribed] = useState(false);
  const shown =
    filter === "All" ? gallery : gallery.filter((x) => x[0] === filter);
  return (
    <main className="home-page">
      <ScrollPanels/>
      <section className="section" id="fresh">
        <div className="container">
          <Heading
            eyebrow="FRESH ON THE LIST"
            title="LATEST EVENTS"
            link="/events"
          />
        </div>
        <Marquee />
      </section>
      <section className="section spotlight-section">
        <div className="container">
          <Heading eyebrow="" title="RSVP TOP PICK" />
        </div>
        <Marquee spotlight />
      </section>
      <section className="section gallery-section">
        <div className="container">
          <Heading eyebrow="INSIDE THE ROOM" title="LATEST EVENTS GALLERY" />
          <div className="filter-row">
            {["All", "Dining", "Fashion", "Property", "Music", "Art"].map(
              (x) => (
                <button
                  key={x}
                  onClick={() => setFilter(x)}
                  className={filter === x ? "active" : ""}
                >
                  {x}
                </button>
              ),
            )}
          </div>
          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {shown.map((x, i) => (
                <motion.article
                  layout
                  key={x[2]}
                  className={`gallery-tile tile-${i % 4}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={`https://images.unsplash.com/${x[1]}?auto=format&fit=crop&w=1000&q=80`}
                    alt={x[2]}
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span>{x[0].toUpperCase()}</span>
                    <h3>{x[2]}</h3>
                    <ArrowUpRight size={17} />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <section className="section artists-section">
        <div className="container">
          <Heading
            eyebrow=""
            title="ARTIST'S & INFLUENCERS"
            link="/artists"
          />
          <div className="artist-grid">
            {artists.map((a, i) => (
              <Reveal key={a[1]} delay={i * 0.1}>
                <article className="artist-card">
                  <div className="artist-image">
                    <img
                      src={`https://images.unsplash.com/${a[2]}?auto=format&fit=crop&w=900&q=85`}
                      alt=""
                      loading="lazy"
                    />
                    <span className="video-badge">
                      <Play size={10} fill="currentColor" /> VIDEO SPOTLIGHT
                    </span>
                    <div className="artist-social">
                      <a href="https://instagram.com" aria-label="Instagram">
                        <Instagram size={16} />
                      </a>
                      <a href="https://youtube.com" aria-label="YouTube">
                        <Youtube size={16} />
                      </a>
                    </div>
                  </div>
                  <span className="eyebrow">
                    {a[0]}
                  </span>
                  <h3>{a[1]}</h3>
                </article>
              </Reveal>
            ))}
          </div>
          <Link className="text-link artist-link" to="/artists">
            VIEW ARTISTS & INFLUENCERS <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <section className="tickets-feature">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="Dubai evening interior" />
        <div>
          <span className="eyebrow">TICKETS & OFFERS</span>
          <h2>YOUR NEXT GREAT NIGHT.</h2>
          <p>Good connections start here.</p>
          <Link className="button button-small" to="/tickets">Explore offers <ArrowUpRight size={13}/></Link>
        </div>
      </section>
      <section className="newsletter-section">
        <div className="newsletter-orb" />
        <div className="newsletter-content">
          <h2>
            GET ON
            <br />
            <em>THE LIST.</em>
          </h2>
          <p>
            New rooms, secret dinners and last-minute drops — straight to your
            inbox.
          </p>
          <form
            className="newsletter-form"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                setSubscribed(true);
              } catch {
                setSubscribed(true);
              }
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button>
              <span>{subscribed ? "YOU’RE ON THE LIST" : "SUBSCRIBE"}</span>
              <Send size={16} />
            </button>
          </form>
          <small>
            {subscribed
              ? "Thanks. Watch your inbox."
              : "OCCASIONAL NOTES. ALWAYS WORTH OPENING."}
          </small>
        </div>
      </section>
    </main>
  );
}
