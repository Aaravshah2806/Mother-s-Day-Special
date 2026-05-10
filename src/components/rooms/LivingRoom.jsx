import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIVING_ROOM_DATA } from '../../data/roomData';
import EditablePhoto from '../ui/EditablePhoto';
import EditableText from '../ui/EditableText';

function Polaroid({ photo, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: parseFloat(photo.rotation) * 0.5 }}
      animate={{ opacity: 1, y: 0, rotate: parseFloat(photo.rotation) }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.7, type: 'spring', stiffness: 120 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.12,
        rotate: 0,
        zIndex: 20,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
      style={{
        cursor: 'none',
        background: 'white',
        padding: '10px 10px 36px',
        borderRadius: 4,
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
        transformOrigin: 'center bottom',
      }}
    >
      <EditablePhoto
        dataKey={`living_polaroid_${index}`}
        defaultUrl={photo.url}
        alt={photo.caption}
        style={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />
      <div style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontStyle: 'italic',
        fontSize: '0.8rem',
        color: '#4A2C2A',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 1.4,
      }}>
        <EditableText
          dataKey={`living_polaroid_caption_${index}`}
          defaultValue={photo.caption}
        />
      </div>
    </motion.div>
  );
}

export default function LivingRoom() {
  const { slides, polaroids } = LIVING_ROOM_DATA;
  const [current, setCurrent] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div style={{ color: 'white', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: 36 }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📺</div>
        <h3 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#F5D5A0',
          marginBottom: 8,
        }}>
          Our Favourite Moments
        </h3>
        <p style={{ color: '#D4A574', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
          Every frame a memory 🎞️
        </p>
      </motion.div>

      {/* TV Frame slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="tv-frame"
        style={{ marginBottom: 48, maxWidth: 620, margin: '0 auto 48px' }}
      >
        {/* TV top bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          gap: 8,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: '#666',
            marginLeft: 8,
          }}>
            📡 Family Channel — Live
          </span>
        </div>

        <div className="tv-screen" style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', height: 340 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <EditablePhoto
                dataKey={`living_slide_${current}`}
                defaultUrl={slides[current].url}
                alt={slides[current].caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Caption overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                color: 'white',
                fontSize: '1.1rem',
                zIndex: 2,
              }}>
                <EditableText
                  dataKey={`living_slide_caption_${current}`}
                  defaultValue={slides[current].caption}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Screen scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          <button
            onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '50%',
              width: 36,
              height: 36,
              cursor: 'none',
              fontSize: '0.9rem',
            }}
          >
            ◀
          </button>

          {/* Dot indicators */}
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? '#D4A574' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
            />
          ))}

          <button
            onClick={() => setCurrent(c => (c + 1) % slides.length)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '50%',
              width: 36,
              height: 36,
              cursor: 'none',
              fontSize: '0.9rem',
            }}
          >
            ▶
          </button>
        </div>
      </motion.div>

      {/* Polaroids section */}
      <h4 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '1.4rem',
        color: '#F5D5A0',
        textAlign: 'center',
        marginBottom: 32,
      }}>
        📷 Polaroid Wall
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 24,
        padding: '0 16px',
      }}>
        {polaroids.map((photo, i) => (
          <Polaroid key={i} photo={photo} index={i} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48, fontSize: '1.8rem' }}>
        🎞️ 📸 ✨
      </div>
    </div>
  );
}
