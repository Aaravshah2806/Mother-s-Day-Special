import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ROOMS } from '../../data/roomData';

const ROOM_CONFIG = [
  {
    id: 'bedroom',
    label: '🕯️ Bedroom',
    description: 'Whispers & Letters',
    x: 14,
    y: 38,
    color: '#C4856A',
    glow: 'rgba(196,133,106,0.5)',
  },
  {
    id: 'livingRoom',
    label: '📺 Living Room',
    description: 'Family Memories',
    x: 38,
    y: 44,
    color: '#D4A574',
    glow: 'rgba(212,165,116,0.5)',
  },
  {
    id: 'kitchen',
    label: '👩‍🍳 Kitchen',
    description: 'Recipes & Love',
    x: 62,
    y: 44,
    color: '#FF9E6A',
    glow: 'rgba(255,158,106,0.5)',
  },
  {
    id: 'garden',
    label: '🌸 Garden',
    description: 'Wishes & Flowers',
    x: 86,
    y: 38,
    color: '#7DAF7A',
    glow: 'rgba(125,175,122,0.5)',
  },
];


function RoomHotspot({ room, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      style={{
        position: 'absolute',
        left: `${room.x}%`,
        top: `${room.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'none',
        background: 'none',
        border: 'none',
        zIndex: 10,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(room.id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-16px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${room.glow} 0%, transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0.3, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Button pill */}
      <motion.div
        style={{
          position: 'relative',
          background: hovered
            ? `linear-gradient(135deg, ${room.color}, ${room.color}CC)`
            : 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)',
          border: `1.5px solid ${hovered ? room.color : 'rgba(255,255,255,0.5)'}`,
          borderRadius: '100px',
          padding: '10px 20px',
          minWidth: 140,
          boxShadow: hovered
            ? `0 8px 32px ${room.glow}`
            : '0 4px 16px rgba(74,44,42,0.12)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: hovered ? 'white' : '#4A2C2A',
            whiteSpace: 'nowrap',
          }}
        >
          {room.label}
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: hovered ? 'rgba(255,255,255,0.85)' : '#7A5A4A',
            marginTop: 2,
          }}
        >
          {room.description}
        </div>
      </motion.div>

      {/* Pulsing dot indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: -12,
          left: '50%',
          translateX: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: room.color,
        }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}

export default function HouseScene({ onOpenRoom }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const layer1X = useTransform(mouseX, [-1, 1], [-12, 12]);
  const layer1Y = useTransform(mouseY, [-1, 1], [-8, 8]);
  const layer2X = useTransform(mouseX, [-1, 1], [-6, 6]);
  const layer2Y = useTransform(mouseY, [-1, 1], [-4, 4]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFE8C8 0%, #FFF0DC 40%, #FFF8F0 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 60, zIndex: 5, position: 'relative' }}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          color: '#D4A574',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          4 rooms · click to explore
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: '#4A2C2A',
          lineHeight: 1.2,
        }}>
          Every room holds a memory
        </h2>
      </motion.div>

      {/* Parallax house illustration area */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 900, height: 420 }}>

        {/* Sky layer (deep parallax) */}
        <motion.div
          style={{ x: layer1X, y: layer1Y, position: 'absolute', inset: 0 }}
        >
          {/* Cloud 1 */}
          <div style={{
            position: 'absolute', top: '8%', left: '5%',
            width: 120, height: 50,
            background: 'white',
            borderRadius: 50,
            opacity: 0.7,
            filter: 'blur(2px)',
          }} />
          {/* Cloud 2 */}
          <div style={{
            position: 'absolute', top: '12%', right: '10%',
            width: 90, height: 40,
            background: 'white',
            borderRadius: 50,
            opacity: 0.6,
            filter: 'blur(2px)',
          }} />
        </motion.div>

        {/* House illustration (SVG based) */}
        <motion.div
          style={{
            x: layer2X,
            y: layer2Y,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* Simple house SVG */}
          <svg
            viewBox="0 0 700 360"
            style={{ width: '100%', maxWidth: 700, height: 'auto', filter: 'drop-shadow(0 12px 40px rgba(74,44,42,0.18))' }}
          >
            {/* Sky */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD0A0" />
                <stop offset="100%" stopColor="#FFE8C8" />
              </linearGradient>
              <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DAF7A" />
                <stop offset="100%" stopColor="#5A8A5A" />
              </linearGradient>
              <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EDD5A8" />
                <stop offset="100%" stopColor="#D4A574" />
              </linearGradient>
              <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C4856A" />
                <stop offset="100%" stopColor="#A0604A" />
              </linearGradient>
            </defs>

            {/* Background sky */}
            <rect width="700" height="360" fill="url(#skyGrad)" rx="16" />

            {/* Ground / grass */}
            <rect x="0" y="290" width="700" height="70" fill="url(#grassGrad)" rx="0 0 16 16" />

            {/* Main house body — wider for 4 rooms */}
            <rect x="140" y="155" width="420" height="165" fill="url(#wallGrad)" rx="4" />

            {/* Roof */}
            <polygon points="120,160 350,42 580,160" fill="url(#roofGrad)" />
            <polygon points="120,160 350,42 580,160" fill="none" stroke="#8B5030" strokeWidth="3" />

            {/* Chimney */}
            <rect x="440" y="55" width="40" height="80" fill="#8B5E3C" rx="4" />
            {/* Smoke puffs */}
            <circle cx="460" cy="50" r="8" fill="rgba(200,200,200,0.5)" />
            <circle cx="455" cy="35" r="11" fill="rgba(200,200,200,0.35)" />
            <circle cx="462" cy="20" r="14" fill="rgba(200,200,200,0.2)" />

            {/* Door */}
            <rect x="310" y="228" width="80" height="92" fill="#7A4A2A" rx="40 40 0 0" />
            <circle cx="362" cy="278" r="5" fill="#D4A574" />

            {/* Window 1 — Bedroom (left) */}
            <rect x="158" y="188" width="68" height="58" fill="#A8D4F5" rx="7" opacity="0.8" />
            <line x1="192" y1="188" x2="192" y2="246" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="158" y1="217" x2="226" y2="217" stroke="white" strokeWidth="2" opacity="0.6" />
            <rect x="159" y="189" width="66" height="56" fill="#FFD080" rx="6" opacity="0.18" />

            {/* Window 2 — Living Room */}
            <rect x="248" y="188" width="54" height="58" fill="#A8D4F5" rx="7" opacity="0.8" />
            <line x1="275" y1="188" x2="275" y2="246" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="248" y1="217" x2="302" y2="217" stroke="white" strokeWidth="2" opacity="0.6" />
            <rect x="249" y="189" width="52" height="56" fill="#FFD080" rx="6" opacity="0.22" />

            {/* Window 3 — Kitchen (with warm steam tint) */}
            <rect x="398" y="188" width="54" height="58" fill="#A8D4F5" rx="7" opacity="0.8" />
            <line x1="425" y1="188" x2="425" y2="246" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="398" y1="217" x2="452" y2="217" stroke="white" strokeWidth="2" opacity="0.6" />
            {/* Warm kitchen glow */}
            <rect x="399" y="189" width="52" height="56" fill="#FF9E6A" rx="6" opacity="0.2" />

            {/* Window 4 — Garden side (right) */}
            <rect x="474" y="188" width="68" height="58" fill="#A8D4F5" rx="7" opacity="0.8" />
            <line x1="508" y1="188" x2="508" y2="246" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="474" y1="217" x2="542" y2="217" stroke="white" strokeWidth="2" opacity="0.6" />
            <rect x="475" y="189" width="66" height="56" fill="#7DAF7A" rx="6" opacity="0.15" />

            {/* Path to door */}
            <ellipse cx="350" cy="310" rx="60" ry="20" fill="#D4A574" opacity="0.4" />
            <rect x="330" y="290" width="40" height="25" fill="#C4956A" opacity="0.5" />

            {/* Small flowers in garden */}
            {[90, 125, 565, 600, 108].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="290" x2={x} y2="310" stroke="#5A8A5A" strokeWidth="3" />
                <circle cx={x} cy="287" r="9" fill={['#FF9EBB', '#FFD700', '#C8A2FF', '#FF7BAC', '#7DAF7A'][i]} />
              </g>
            ))}

            {/* Tree left */}
            <rect x="45" y="220" width="16" height="80" fill="#7A5020" />
            <circle cx="53" cy="200" r="50" fill="#5A8A5A" opacity="0.85" />
            <circle cx="33" cy="215" r="35" fill="#4A7A4A" opacity="0.75" />

            {/* Tree right */}
            <rect x="634" y="220" width="16" height="80" fill="#7A5020" />
            <circle cx="642" cy="200" r="50" fill="#5A8A5A" opacity="0.85" />
            <circle cx="662" cy="215" r="35" fill="#4A7A4A" opacity="0.75" />

            {/* Sunlight rays */}
            <circle cx="80" cy="70" r="40" fill="#FFD080" opacity="0.25" />
            <circle cx="80" cy="70" r="28" fill="#FFD080" opacity="0.35" />
            <circle cx="80" cy="70" r="18" fill="#FFDF90" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Room hotspots (positioned over SVG) */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {ROOM_CONFIG.map(room => (
            <RoomHotspot key={room.id} room={room} onOpen={onOpenRoom} />
          ))}
        </div>
      </div>
    </section>
  );
}
