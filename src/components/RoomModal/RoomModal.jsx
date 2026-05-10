import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROOM_THEMES = {
  bedroom: {
    overlay: 'rgba(30,10,8,0.92)',
    accent: '#C4856A',
    label: '🕯️ Bedroom',
    tagline: 'Whispers & Letters',
  },
  livingRoom: {
    overlay: 'rgba(20,12,8,0.92)',
    accent: '#D4A574',
    label: '📺 Living Room',
    tagline: 'Family Memories',
  },
  kitchen: {
    overlay: 'rgba(28,14,8,0.92)',
    accent: '#FF9E6A',
    label: '👩‍🍳 Kitchen',
    tagline: 'Recipes & Love',
  },
  garden: {
    overlay: 'rgba(8,25,8,0.92)',
    accent: '#7DAF7A',
    label: '🌸 Garden',
    tagline: 'Wishes & Flowers',
  },
};

export default function RoomModal({ roomId, onClose, children }) {
  const theme = ROOM_THEMES[roomId] || ROOM_THEMES.bedroom;

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {roomId && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: theme.overlay,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              inset: '24px',
              zIndex: 101,
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(20,12,8,0.6)',
              border: `1px solid ${theme.accent}33`,
              boxShadow: `0 0 0 1px ${theme.accent}22, 0 32px 80px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 28px',
              borderBottom: `1px solid ${theme.accent}25`,
              background: 'rgba(0,0,0,0.2)',
              flexShrink: 0,
            }}>
              <div>
                <h2 style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'white',
                }}>
                  {theme.label}
                </h2>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: theme.accent,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}>
                  {theme.tagline}
                </p>
              </div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: `${theme.accent}22`,
                  border: `1px solid ${theme.accent}44`,
                  color: theme.accent,
                  fontSize: '1.2rem',
                  cursor: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s',
                }}
              >
                ✕
              </motion.button>
            </div>

            {/* Content area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '28px',
            }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
