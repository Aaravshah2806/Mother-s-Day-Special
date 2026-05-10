import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'Loading memories...',
  'Lighting candles...',
  'Planting flowers...',
  'Preparing the house...',
];

export default function LoadingScreen({ onDone }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cycle through messages
    const msgTimer = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
    }, 700);

    // Total loading time
    const done = setTimeout(() => {
      clearInterval(msgTimer);
      setVisible(false);
      setTimeout(onDone, 600);
    }, 2200);

    return () => { clearInterval(msgTimer); clearTimeout(done); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="loading-screen"
        >
          {/* Decorative petals */}
          {['🌸', '💛', '🌷', '✨', '🌺'].map((petal, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                fontSize: `${1.2 + Math.random()}rem`,
                top: `${15 + i * 14}%`,
                left: i % 2 === 0 ? `${8 + i * 5}%` : undefined,
                right: i % 2 !== 0 ? `${8 + i * 4}%` : undefined,
                opacity: 0.45,
              }}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            >
              {petal}
            </motion.div>
          ))}

          {/* Central heart */}
          <div className="loading-heart" style={{ marginBottom: 28, position: 'relative' }}>
            🏡
            {/* Orbit sparkle */}
            <motion.div
              style={{ position: 'absolute', top: -4, right: -8, fontSize: '1rem' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              ✨
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              fontWeight: 700,
              color: '#4A2C2A',
              marginBottom: 6,
              textAlign: 'center',
            }}
          >
            House of <span style={{ color: '#C4856A', fontStyle: 'italic' }}>Memories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              color: '#D4A574',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            A Mother's Day Special
          </motion.p>

          {/* Progress bar */}
          <div style={{
            width: 240,
            height: 3,
            background: 'rgba(212,165,116,0.2)',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #D4A574, #C4856A)',
                borderRadius: 2,
              }}
            />
          </div>

          {/* Cycling message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                color: '#C4856A',
                letterSpacing: '0.05em',
              }}
            >
              {MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
