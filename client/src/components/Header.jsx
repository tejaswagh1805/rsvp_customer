import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, Ticket, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
const links = [
  ["Events", "/events"],
  ["Host", "/host"],
  ["Membership", "/membership"],
  ["Events Wall", "/wall"],
  ["Press", "/press"],
  ["About", "/about"],
  ["Tickets & Offers", "/tickets"],
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false),
    [light, setLight] = useState(
      () => localStorage.getItem("rsvp-theme") === "light",
    );
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("rsvp-theme", light ? "light" : "dark");
  }, [light]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="brand">
          <span>RSVP</span>
          <i>DXB</i>
          <b>®</b>
        </Link>
        <nav className="desktop-nav">
          {links.map(([name, path]) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setLight(!light)}
            aria-label="Toggle theme"
          >
            {light ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <Link className="button button-small header-ticket" to="/tickets"><Ticket size={11}/> Last minute ticket</Link>
          <Link className="header-login" to="/signin">
            Sign in
          </Link>
          <Link className="button button-small" to="/register">
            Register <ArrowUpRight size={14} />
          </Link>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav">
          {links.map(([name, path], i) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {name}
              <ArrowUpRight size={16} />
            </NavLink>
          ))}
          <Link
            className="button"
            to="/register"
            onClick={() => setOpen(false)}
          >
            Register <ArrowUpRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}
