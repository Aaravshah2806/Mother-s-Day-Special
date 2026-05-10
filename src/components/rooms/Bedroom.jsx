import { useState } from 'react';
import { motion } from 'framer-motion';
import { BEDROOM_DATA } from '../../data/roomData';
import EditablePhoto from '../ui/EditablePhoto';
import EditableText from '../ui/EditableText';

function PhotoCard({ photo, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        aspectRatio: '4/3',
        cursor: 'none',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,0,0,0.5)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease',
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <EditablePhoto
        dataKey={`bedroom_photo_${index}`}
        defaultUrl={photo.url}
        alt={photo.caption}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      {/* Caption overlay */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 14px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}
      >
        <EditableText
          dataKey={`bedroom_caption_${index}`}
          defaultValue={photo.caption}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Bedroom() {
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <div style={{ color: 'white', maxWidth: 900, margin: '0 auto' }}>

      {/* Candle ambient header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🕯️</div>
        <h3 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#F5D5A0',
          marginBottom: 8,
        }}>
          A Letter From the Heart
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: '#C4856A',
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
        }}>
          Written with love ✨
        </p>
      </motion.div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          background: 'rgba(255,253,240,0.97)',
          borderRadius: 20,
          padding: '32px 40px',
          borderLeft: '4px solid #D4A574',
          marginBottom: 48,
          cursor: 'none',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Paper texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(transparent, transparent 27px, rgba(212,165,116,0.12) 27px, rgba(212,165,116,0.12) 28px)',
          pointerEvents: 'none',
        }} />

        {/* Wax seal decoration */}
        <div style={{
          position: 'absolute',
          top: 16,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #C4856A, #A0604A)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          💛
        </div>

        <EditableText
          dataKey="bedroom_letter"
          defaultValue={BEDROOM_DATA.letter}
          as="p"
          multiline
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            color: '#3A2018',
            lineHeight: 2.2,
            whiteSpace: 'pre-line',
            position: 'relative',
          }}
        />
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <EditableText
          dataKey="bedroom_quote"
          defaultValue={BEDROOM_DATA.quote}
          as="blockquote"
          style={{
            textAlign: 'center',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#E8C5A0',
            marginBottom: 48,
            padding: '0 32px',
            lineHeight: 1.7,
          }}
        />
      </motion.div>

      {/* Photo grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '1.4rem',
          color: '#F5D5A0',
          marginBottom: 20,
          textAlign: 'center',
        }}>
          📸 Childhood Memories
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}>
          {BEDROOM_DATA.photos.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Footer heart */}
      <div style={{ textAlign: 'center', marginTop: 48, fontSize: '2rem' }}>
        💛 💛 💛
      </div>
    </div>
  );
}
