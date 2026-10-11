import { useState } from 'react'
import { ArrowUpRight, Bookmark, MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EventCard({ event, index = 0, compact = false }) {
  const [saved, setSaved] = useState(false)
  const full = event.confirmed >= event.capacity
  const whatsapp = `https://wa.me/971552521124?text=${encodeURIComponent(`Hi RSVP DXB, I am interested in ${event.title}`)}`

  return (
    <motion.article
      className={`event-card ${compact ? 'event-card-compact' : ''}`}
      initial={compact ? false : { opacity: 0, y: 18 }}
      whileInView={compact ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.48, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
    >
      <div className="event-image">
        <img src={event.image} alt="" loading="lazy" />
        <span className="category-tag">{event.category}</span>
        {!compact && <span className={`capacity-tag ${full ? 'full' : ''}`}>{full ? 'Waitlist' : `${event.capacity - event.confirmed} places left`}</span>}
        <button className={`save-button ${saved ? 'saved' : ''}`} onClick={() => setSaved(!saved)} aria-label="Save event">
          <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <a href={`/events/${event.slug}`} className="event-open" aria-label={`View ${event.title}`}>
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="event-info">
        {compact ? (
          <>
            <div className="event-date">{event.date}<span> · </span>{event.area}</div>
            <h3>{event.title}</h3>
            <a className="event-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </>
        ) : (
          <>
            <div className="event-date">{event.date}<span> · </span>{event.time}</div>
            <h3>{event.title}</h3>
            <div className="event-venue"><MapPin size={12} />{event.venue}, {event.area}</div>
            <div className="event-meta"><span>HOSTED BY <b>{event.host}</b></span><span>{event.confirmed}/{event.capacity} CONFIRMED</span></div>
            <div className="event-card-bottom"><span>OPEN TO {event.tracks.toUpperCase()}</span><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={12} /> WhatsApp</a></div>
          </>
        )}
      </div>
    </motion.article>
  )
}
