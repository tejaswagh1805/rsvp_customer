import { ArrowUpRight, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span>RSVP</span>
            <i>DXB</i>
            <b>®</b>
          </Link>
          <p>
            Dubai's invitation-only guest list for media, creators, tastemakers
            and the private circle.
          </p>
          <span className="tickbox">A TICKBOX UAE COMPANY</span>
        </div>
        <div className="footer-col">
          <label>PLATFORM</label>
          <Link to="/events">What's on</Link>
          <Link to="/wall">Events Wall</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/me">Member area</Link>
        </div>
        <div className="footer-col">
          <label>BUSINESS</label>
          <Link to="/host">Host an event</Link>
          <Link to="/press">Press</Link>
          <Link to="/contact">Partner with us</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="footer-col">
          <label>STAY CONNECTED</label>
          <Link to="/signin">Members login</Link>
          <Link to="/contact">Talk to us</Link>
          <div className="social-links">
            <a href="https://instagram.com">
              <Instagram size={17} />
            </a>
            <a href="https://linkedin.com">
              <Linkedin size={17} />
            </a>
            <a href="https://wa.me/971552521124?text=Hi%20RSVP%20DXB%2C%20I%27d%20love%20to%20know%20more.">
              <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 RSVP DXB · Dubai, UAE</span>
        <span>Good people. Great rooms.</span>
        <span>Privacy · Terms</span>
      </div>
      <a
        className="whatsapp-float"
        href="https://wa.me/971552521124?text=Hi%20RSVP%20DXB%2C%20I%27d%20love%20to%20know%20more."
      >
        <MessageCircle size={21} />
        <span>LET'S TALK</span>
        <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
