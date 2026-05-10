import { useEffect, useState } from 'react';

const HEART_EMOJIS = ['💛', '💗', '🌸', '✨', '💕'];

function Heart({ id, x, delay, size, emoji }) {
  return (
    <div
      key={id}
      style={{
        position: 'fixed',
        left: `${x}%`,
        bottom: '-40px',
        fontSize: `${size}px`,
        animationName: 'heartRise',
        animationDuration: `${3.5 + Math.random() * 2}s`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-out',
        pointerEvents: 'none',
        zIndex: 50,
        userSelect: 'none',
      }}
    >
      {emoji}
    </div>
  );
}

export default function FloatingHearts({ active = true }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!active) return;
    let counter = 0;

    const spawn = () => {
      const newHeart = {
        id: counter++,
        x: 5 + Math.random() * 90,
        delay: 0,
        size: 16 + Math.random() * 20,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      };
      setHearts(prev => [...prev.slice(-14), newHeart]);
    };

    // Initial burst
    for (let i = 0; i < 8; i++) {
      setTimeout(spawn, i * 300);
    }

    // Ongoing trickle
    const interval = setInterval(spawn, 1800);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 50 }}>
      {hearts.map(h => <Heart key={h.id} {...h} />)}
    </div>
  );
}
