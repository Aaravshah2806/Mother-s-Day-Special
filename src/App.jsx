import { useState, useRef, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EditProvider } from './context/EditContext';
import ThreeHouse from './components/Hero/ThreeHouse';
import HeroOverlay from './components/Hero/HeroOverlay';
import HouseScene from './components/HouseScene/HouseScene';
import RoomModal from './components/RoomModal/RoomModal';
import Bedroom from './components/rooms/Bedroom';
import LivingRoom from './components/rooms/LivingRoom';
import Garden from './components/rooms/Garden';
import Kitchen from './components/rooms/Kitchen';
import MemoryTimeline from './components/MemoryTimeline/MemoryTimeline';
import CursorGlow from './components/ui/CursorGlow';
import FloatingHearts from './components/ui/FloatingHearts';
import AudioToggle from './components/ui/AudioToggle';
import LoadingScreen from './components/ui/LoadingScreen';
import EditToolbar from './components/ui/EditToolbar';
import SharePanel from './components/ui/SharePanel';
import EditableText from './components/ui/EditableText';

const ROOM_COMPONENTS = {
  bedroom: <Bedroom />,
  livingRoom: <LivingRoom />,
  garden: <Garden />,
  kitchen: <Kitchen />,
};

function AppContent() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const houseRef = useRef(null);

  const handleEnter = () => {
    houseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading screen */}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Edit toolbar (only in edit mode) */}
      <EditToolbar onOpenShare={() => setShareOpen(true)} />

      {/* Share panel */}
      <SharePanel open={shareOpen} onClose={() => setShareOpen(false)} />

      {/* Global cursor */}
      <CursorGlow />

      {/* Floating hearts on hero */}
      <FloatingHearts active={!activeRoom && loaded} />

      {/* Ambient audio toggle */}
      <AudioToggle />

      {/* ==========================================
          HERO — Full viewport Three.js scene
          ========================================== */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Suspense fallback={
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #FFE0B2, #FFD0A0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '1.5rem',
            color: '#C4856A',
          }}>
            Loading memories... 💛
          </div>
        }>
          <ThreeHouse />
        </Suspense>
        <HeroOverlay onEnter={handleEnter} />
      </section>

      {/* ==========================================
          HOUSE SCENE — Explore the rooms
          ========================================== */}
      <div ref={houseRef}>
        <HouseScene onOpenRoom={setActiveRoom} />
      </div>

      {/* ==========================================
          MEMORY TIMELINE
          ========================================== */}
      <MemoryTimeline />

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer style={{
        textAlign: 'center',
        padding: '72px 20px',
        background: 'linear-gradient(180deg, #FDEFD8, #FFF8F0)',
        borderTop: '1px solid rgba(212,165,116,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background petals */}
        {['🌸', '💛', '🌷', '✨', '🌺', '💗'].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${1 + (i % 3) * 0.4}rem`,
              opacity: 0.12,
              top: `${20 + (i * 13) % 60}%`,
              left: `${(i * 17) % 90}%`,
              animation: `waveFloat ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              pointerEvents: 'none',
            }}
          >
            {p}
          </div>
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>💛</div>

          <EditableText
            dataKey="footer_quote"
            defaultValue={`"A mother is your first friend, your best friend, your forever friend."`}
            as="p"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: '#C4856A',
              marginBottom: 16,
              lineHeight: 1.7,
            }}
          />

          <div style={{
            width: 80,
            height: 2,
            background: 'linear-gradient(to right, transparent, #D4A574, transparent)',
            margin: '0 auto 20px',
          }} />

          <EditableText
            dataKey="footer_message"
            defaultValue="Made with 💛 for the most special person in the world"
            as="p"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#A07050',
              letterSpacing: '0.15em',
              marginBottom: 24,
            }}
          />

          <p style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.6rem',
            color: '#C4856A',
            marginBottom: 8,
          }}>
            Happy Mother's Day
          </p>

          <div style={{ marginTop: 16, fontSize: '1.5rem', letterSpacing: 8 }}>
            💛 🌸 💛
          </div>
        </div>
      </footer>

      {/* ==========================================
          ROOM MODAL — Opens on room click
          ========================================== */}
      <AnimatePresence>
        {activeRoom && (
          <RoomModal roomId={activeRoom} onClose={() => setActiveRoom(null)}>
            {ROOM_COMPONENTS[activeRoom]}
          </RoomModal>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <EditProvider>
      <AppContent />
    </EditProvider>
  );
}
