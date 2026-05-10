import { motion } from 'framer-motion';
import EditableText from '../ui/EditableText';

export default function HeroOverlay({ onEnter }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 1.5rem',
        pointerEvents: 'none',
      }}
    >
      {/* Soft vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(74,44,42,0.18) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        style={{
          color: '#D4A574',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.875rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}
      >
        A Mother's Day Special ✨
      </motion.p>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          color: '#4A2C2A',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          marginBottom: '1.25rem',
          textShadow: '0 2px 20px rgba(255,248,240,0.8)',
          lineHeight: 1.15,
        }}
      >
        House of<br />
        <span style={{ color: '#C4856A', fontStyle: 'italic' }}>Memories</span>
      </motion.h1>

      {/* Subtitle — editable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        style={{
          color: '#7A4A3A',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 300,
          marginBottom: '2.5rem',
          maxWidth: '28rem',
          pointerEvents: 'all',
        }}
      >
        <EditableText
          dataKey="hero_subtitle"
          defaultValue="Step inside a house built from love, laughter, and a lifetime of moments."
          as="p"
          style={{ color: '#7A4A3A', fontWeight: 300 }}
        />
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.7, duration: 0.6, type: 'spring', stiffness: 180 }}
        whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(212,165,116,0.5)' }}
        whileTap={{ scale: 0.96 }}
        onClick={onEnter}
        style={{
          pointerEvents: 'all',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #D4A574, #C4856A)',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '1rem',
          letterSpacing: '0.08em',
          padding: '0.875rem 2.5rem',
          borderRadius: '100px',
          border: 'none',
          boxShadow: '0 4px 24px rgba(196,133,106,0.4)',
        }}
      >
        Enter the House →
      </motion.button>
    </div>
  );
}
