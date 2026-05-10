import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from '../../context/EditContext';
import { useCustomText } from '../../hooks/useCustomData';

// Ambient lullaby-style track via a data URI (soft piano hum using Web Audio API)
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

  return { playing, toggle, stop };
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
  const { isEditMode } = useEditMode();
  const { playing, toggle, stop } = useSoftAmbience();
  const [embedCode, setEmbedCode] = useCustomText('bg_audio_embed', '');
  const [showInput, setShowInput] = useState(false);
  const [draft, setDraft] = useState(embedCode);

  const isCustom = !!embedCode.trim();

  // If custom audio is set, ensure default audio is stopped
  useEffect(() => {
    if (isCustom && playing) {
      stop();
    }
  }, [isCustom, playing, stop]);

  const handleSave = () => {
    setEmbedCode(draft);
    setShowInput(false);
  };

  return (
    <>
      {/* If custom embed code is present, render it floating */}
      <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 199 }}>
        {isCustom ? (
           <div 
             dangerouslySetInnerHTML={{ __html: embedCode }} 
             style={{ 
               boxShadow: '0 8px 32px rgba(74,44,42,0.15)', 
               borderRadius: '12px', 
               overflow: 'hidden',
               background: '#FFF8F0',
               minWidth: '280px'
             }} 
           />
        ) : (
          <motion.button
            onClick={toggle}
            className="audio-toggle"
            style={{ position: 'relative', bottom: 'auto', right: 'auto' }}
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
        )}
        
        {/* Edit Mode Button just above the player */}
        {isEditMode && (
          <button 
            onClick={() => { setDraft(embedCode); setShowInput(true); }}
            className="edit-toolbar-btn"
            style={{ 
              position: 'absolute', 
              top: '-40px', 
              right: '0', 
              background: 'rgba(255,248,240,0.95)', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '6px 12px',
              borderRadius: '20px'
            }}
          >
            🎵 Change Music
          </button>
        )}
      </div>

      {/* Input Modal */}
      <AnimatePresence>
         {showInput && (
            <motion.div 
               className="share-panel-backdrop"
               onClick={() => setShowInput(false)}
            >
               <motion.div 
                 className="share-panel-card"
                 onClick={e => e.stopPropagation()}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
               >
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ color: '#4A2C2A', margin: 0, fontSize: '1.2rem', fontFamily: '"Playfair Display", serif' }}>Custom Music</h3>
                    <button onClick={() => setShowInput(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                 </div>
                 
                 <p style={{ fontSize: '0.85rem', color: '#A07050', marginBottom: '16px', lineHeight: 1.5 }}>
                   Paste an <b>embed code</b> (iframe) from Spotify, Apple Music, YouTube, or SoundCloud. <br/>
                   Leave it completely empty to use the default ambient music.
                 </p>
                 <textarea 
                   value={draft}
                   onChange={e => setDraft(e.target.value)}
                   placeholder='<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/..." width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
                   style={{
                     width: '100%', height: '140px', padding: '12px', 
                     borderRadius: '8px', border: '1.5px dashed #D4A574', 
                     background: 'rgba(212,165,116,0.05)', outline: 'none',
                     marginBottom: '20px', fontFamily: 'monospace', fontSize: '0.8rem',
                     color: '#4A2C2A', resize: 'vertical'
                   }}
                 />
                 <button 
                    onClick={handleSave} 
                    className="share-panel-btn share-panel-btn-primary" 
                    style={{ width: '100%' }}
                 >
                   Save Music
                 </button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
}
