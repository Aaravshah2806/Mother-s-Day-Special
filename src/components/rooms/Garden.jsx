import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GARDEN_DATA } from '../../data/roomData';
import EditableText from '../ui/EditableText';
import { useEditMode } from '../../context/EditContext';

function Flower({ flower, index, onReveal }) {
  const [bloomed, setBloomed] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const { isEditMode } = useEditMode();

  const handleClick = () => {
    if (!bloomed) {
      setBloomed(true);
      setTimeout(() => setShowWish(true), 400);
    } else {
      setShowWish(s => !s);
    }
  };

  const petalAngles = [0, 60, 120, 180, 240, 300];

  return (
    <div
      style={{
        position: 'absolute',
        left: `${flower.x}%`,
        top: `${flower.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: showWish ? 20 : 5,
      }}
    >
      {/* Flower button */}
      <motion.div
        onClick={handleClick}
        style={{ cursor: 'none', position: 'relative', width: 60, height: 80 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Stem */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4,
          height: 45,
          background: `linear-gradient(${flower.stemColor}, #3A6A3A)`,
          borderRadius: 2,
        }} />

        {/* Petals */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
          {petalAngles.map((angle, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: bloomed ? 1 : 0.2,
                opacity: bloomed ? 1 : 0.4,
                rotate: bloomed ? angle : angle,
              }}
              transition={{
                delay: bloomed ? i * 0.06 : 0,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
              }}
              style={{
                position: 'absolute',
                top: -8,
                left: -10,
                width: 20,
                height: 28,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                background: flower.color,
                transformOrigin: 'bottom center',
                transform: `rotate(${angle}deg)`,
                opacity: 0.85,
              }}
            />
          ))}

          {/* Center */}
          <motion.div
            style={{
              position: 'absolute',
              top: -4,
              left: -8,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#FFD700',
              border: '2px solid #FFA040',
              zIndex: 2,
            }}
            animate={bloomed ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Wish popup */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            style={{
              position: 'absolute',
              bottom: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 16,
              padding: '14px 18px',
              width: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              zIndex: 30,
              cursor: 'none',
            }}
            onClick={(e) => { e.stopPropagation(); if (!isEditMode) setShowWish(false); }}
          >
            <div style={{ fontSize: '1.1rem', marginBottom: 6, textAlign: 'center' }}>🌸</div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '0.82rem',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.6,
            }}>
              <EditableText
                dataKey={`garden_wish_${index}`}
                defaultValue={flower.wish}
              />
            </div>
            {!isEditMode && (
              <div style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center',
                marginTop: 8,
                fontFamily: 'Inter',
              }}>
                tap to close
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating butterfly SVG
function Butterfly({ style }) {
  return (
    <div style={{ ...style, animation: 'butterfly 8s ease-in-out infinite', pointerEvents: 'none' }}>
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <ellipse cx="8" cy="8" rx="8" ry="6" fill="#FFB3D9" opacity="0.7" />
        <ellipse cx="24" cy="8" rx="8" ry="6" fill="#FFB3D9" opacity="0.7" />
        <ellipse cx="8" cy="14" rx="5" ry="4" fill="#FF9EBB" opacity="0.6" />
        <ellipse cx="24" cy="14" rx="5" ry="4" fill="#FF9EBB" opacity="0.6" />
        <line x1="16" y1="4" x2="16" y2="18" stroke="#7A3A5A" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function Garden() {
  const { flowers } = GARDEN_DATA;
  const [allBloomed, setAllBloomed] = useState(false);

  return (
    <div style={{ color: 'white', position: 'relative' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: 32 }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌸</div>
        <h3 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#B8D8B5',
          marginBottom: 8,
        }}>
          The Wishing Garden
        </h3>
        <p style={{ color: '#7DAF7A', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
          Click each flower to reveal a wish 🌷
        </p>
      </motion.div>

      {/* Garden scene */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          position: 'relative',
          width: '100%',
          height: 480,
          borderRadius: 20,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0A1F0A 0%, #1A4A1A 40%, #2D6A2D 70%, #4A8A4A 100%)',
          marginBottom: 40,
        }}
      >
        {/* Stars / fireflies in the dark sky */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              borderRadius: '50%',
              background: 'rgba(255,255,220,0.7)',
              animation: `candleFlicker ${1.5 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Moon */}
        <div style={{
          position: 'absolute',
          top: 24,
          right: 40,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFDE7, #FFF9C4)',
          boxShadow: '0 0 40px rgba(255,253,200,0.4)',
        }} />

        {/* Butterflies */}
        <Butterfly style={{ position: 'absolute', top: '20%', left: '20%' }} />
        <Butterfly style={{ position: 'absolute', top: '35%', right: '25%', animationDelay: '3s' }} />

        {/* Ground strip */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: 'linear-gradient(transparent, rgba(30, 80, 30, 0.6))',
        }} />

        {/* Flowers */}
        {flowers.map((flower, i) => (
          <Flower key={flower.id} flower={flower} index={i} />
        ))}

        {/* Instruction hint (fades after 3s) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3.5, duration: 1.5 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: 100,
            padding: '8px 20px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.8)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          🌸 Click the flowers to discover your wishes
        </motion.div>
      </motion.div>

      {/* Wishes list below */}
      <h4 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '1.4rem',
        color: '#B8D8B5',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        All My Wishes For You 💚
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}>
        {flowers.map((flower, i) => (
          <motion.div
            key={flower.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(125,175,122,0.25)',
              borderRadius: 16,
              padding: '18px 20px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>
              {['🌸', '☀️', '💛', '🌷', '🏡', '🌺'][i]}
            </div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: '#D4EFD4',
              lineHeight: 1.7,
            }}>
              <EditableText
                dataKey={`garden_wish_${i}`}
                defaultValue={flower.wish}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40, fontSize: '1.8rem' }}>
        🌸 🌺 🌷 🌼 🌻
      </div>
    </div>
  );
}
