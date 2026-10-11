import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import EventCard from "../components/EventCard.jsx";
import { events } from "../data/events.js";
export default function Events() {
  const [category, setCategory] = useState("All"),
    [area, setArea] = useState("All areas"),
    [sort, setSort] = useState("Soonest");
  const areas = ["All areas", ...new Set(events.map((e) => e.area))];
  const list = useMemo(() => {
    let a = events.filter(
      (e) =>
        (category === "All" || e.category === category) &&
        (area === "All areas" || e.area === area),
    );
    if (sort === "Few places left")
      a = a.sort(
        (x, y) => x.capacity - x.confirmed - (y.capacity - y.confirmed),
      );
    if (sort === "Newest") a = [...a].reverse();
    return a;
  }, [category, area, sort]);
  return (
    <main className="events-page">
      <section className="events-page-hero">
        <span className="eyebrow">THE RSVP DXB CALENDAR</span>
        <h1>
          What is
          <br />
          <em>on.</em>
        </h1>
        <p>Filter by week, area and category.</p>
        <span className="events-hero-index">DUBAI · 2026</span>
      </section>
      <section className="container listing-section">
        <div className="listing-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT ROOM</span>
            <h2>{list.length} EVENTS</h2>
          </div>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Soonest</option>
            <option>Newest</option>
            <option>Few places left</option>
          </select>
        </div>
        <div className="filter-row listing-filters">
          {[
            "All",
            "Dining",
            "Fashion",
            "Property",
            "Music",
            "Art",
            "Nightlife",
          ].map((x) => (
            <button
              className={category === x ? "active" : ""}
              onClick={() => setCategory(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="events-grid">
          {list.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>
        <div className="demo-notice">
          This is a preview calendar. Event availability and RSVP access are
          demonstration data.
        </div>
      </section>
      <div className="listing-cta">
        <span className="eyebrow">NOT ON THE LIST YET?</span>
        <h2>
          Good rooms start
          <br />
          with good people.
        </h2>
        <a href="/register" className="button">
          Apply for access <ArrowUpRight size={16} />
        </a>
      </div>
    </main>
  );
}
