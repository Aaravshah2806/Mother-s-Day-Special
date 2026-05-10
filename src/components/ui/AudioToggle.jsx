import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Ambient lullaby-style track via a data URI (soft piano hum using Web Audio API)
// We'll generate a gentle tone programmatically so no external asset is needed.
function useSoftAmbience() {
  const ctx = useRef(null);
  const nodes = useRef([]);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    if (ctx.current) return;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    ctx.current = audioCtx;

    // Gentle layered drones — soft, warm, not intrusive
    const tones = [
      { freq: 220.0, gain: 0.04 },  // A3
      { freq: 329.6, gain: 0.03 },  // E4
      { freq: 440.0, gain: 0.02 },  // A4
      { freq: 164.8, gain: 0.025 }, // E3 bass
    ];

    tones.forEach(({ freq, gain }) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      // Slow volume tremolo for warmth
      lfo.type = 'sine';
      lfo.frequency.value = 0.15 + Math.random() * 0.1;
      lfoGain.gain.value = gain * 0.3;
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);

      gainNode.gain.value = gain;
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      lfo.start();

      nodes.current.push(osc, lfo);
    });
  };

  const stop = () => {
    nodes.current.forEach(n => { try { n.stop(); } catch (_) {} });
    nodes.current = [];
    ctx.current?.close();
    ctx.current = null;
  };

  const toggle = () => {
    if (playing) { stop(); setPlaying(false); }
    else { start(); setPlaying(true); }
  };

  // Clean up on unmount
  useEffect(() => () => stop(), []);

  return { playing, toggle };
}

// Animated bars for "sound on" state
function SoundBars({ active }) {
  const heights = [8, 14, 10, 16, 11];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 18 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [h * 0.5, h, h * 0.6, h * 0.85, h * 0.5],
          } : { height: 3 }}
          transition={active ? {
            duration: 0.8 + i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.12,
          } : { duration: 0.3 }}
          style={{
            width: 3,
            borderRadius: 2,
            background: active ? '#C4856A' : '#D4A574',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  );
}

export default function AudioToggle() {
  const { playing, toggle } = useSoftAmbience();

  return (
    <motion.button
      onClick={toggle}
      className="audio-toggle"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      title={playing ? 'Mute ambient music' : 'Play ambient music'}
      animate={playing ? {
        boxShadow: [
          '0 4px 24px rgba(196,133,106,0.25)',
          '0 6px 36px rgba(196,133,106,0.5)',
          '0 4px 24px rgba(196,133,106,0.25)',
        ],
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <SoundBars active={playing} />
    </motion.button>
  );
}
