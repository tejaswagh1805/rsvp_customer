import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'

const slides = [
  { eyebrow: 'THE RSVP DXB EDIT', title: 'GOOD PEOPLE. GREAT ROOMS.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2200&q=90' },
  { title: 'MAKE YOUR NEXT CONNECTION.', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2200&q=90' },
  { title: 'NOT JUST ANOTHER INVITE.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=90' },
  { title: 'FRONT ROW. YOUR WAY.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=90' },
  { title: 'THIS IS YOUR KIND OF CITY.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2200&q=90' },
]

export default function ScrollPanels() {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setIndex(Math.min(slides.length - 1, Math.floor(value * slides.length)))
  })
  const slide = slides[index]

  return (
    <section ref={ref} className="scroll-panels" style={{ height: `${slides.length * 100}vh` }}>
      <div className="scroll-panels-sticky">
        <AnimatePresence mode="sync">
          <motion.div
            className="scroll-panel-image"
            key={slide.image}
            initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.45, ease: 'easeOut' }, scale: { duration: 5, ease: 'linear' } }}
            style={{ backgroundImage: `linear-gradient(90deg,rgba(24,6,10,.35),transparent 66%),linear-gradient(0deg,rgba(18,5,8,.64),transparent 54%),url(${slide.image})` }}
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <div className="scroll-panel-copy" key={index}>
            {slide.eyebrow && <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{slide.eyebrow}</motion.span>}
            <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>{slide.title}</motion.h2>
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}
