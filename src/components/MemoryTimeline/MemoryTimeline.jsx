import { motion } from 'framer-motion';
import EditableText from '../ui/EditableText';

const MEMORIES = [
  { year: 'Day One', emoji: '👶', title: 'The Beginning', description: 'The moment I opened my eyes, you were there — the safest place I would ever know.', color: '#FFB3D9' },
  { year: 'Early Years', emoji: '🍼', title: 'First Steps', description: 'Every stumble, you caught me. Every fall, you lifted me. Every first, you celebrated.', color: '#FFD580' },
  { year: 'Childhood', emoji: '🎒', title: 'School Days', description: 'Packed lunches with love notes. Goodnight stories. You made the ordinary magical.', color: '#A8D4F5' },
  { year: 'Growing Up', emoji: '🌱', title: 'Finding My Way', description: 'When I was lost, your voice was the compass that always led me home.', color: '#7DAF7A' },
  { year: 'Today', emoji: '💛', title: 'Forever Grateful', description: 'No matter how far I go, every good thing in me — I learned from watching you.', color: '#D4A574' },
];

function TimelineCard({ memory, index }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', alignItems: 'center', position: 'relative', marginBottom: 48 }}
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(74,44,42,0.12)' }}
        style={{
          maxWidth: '42%', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
          padding: '24px 28px', boxShadow: '0 4px 24px rgba(74,44,42,0.08)', border: `1px solid ${memory.color}44`,
          borderLeft: isLeft ? `4px solid ${memory.color}` : undefined,
          borderRight: !isLeft ? `4px solid ${memory.color}` : undefined,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease', position: 'relative',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${memory.color}22`, border: `1px solid ${memory.color}55`, borderRadius: 100, padding: '3px 12px', marginBottom: 12 }}>
          <span style={{ fontSize: '0.85rem' }}>{memory.emoji}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7A5040' }}>
            <EditableText dataKey={`timeline_year_${index}`} defaultValue={memory.year} />
          </span>
        </div>
        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: '#4A2C2A', marginBottom: 10 }}>
          <EditableText dataKey={`timeline_title_${index}`} defaultValue={memory.title} />
        </h3>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#7A5040', lineHeight: 1.7, fontStyle: 'italic' }}>
          "<EditableText dataKey={`timeline_desc_${index}`} defaultValue={memory.description} />"
        </div>
      </motion.div>
      <div className="timeline-dot" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', background: memory.color, boxShadow: `0 0 0 4px ${memory.color}33` }} />
    </motion.div>
  );
}

export default function MemoryTimeline() {
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #FFF8F0 0%, #FDEFD8 100%)', overflow: 'hidden' }}>
      <motion.div initial={{ opacity: 0, y: -24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 72 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.3em', color: '#D4A574', textTransform: 'uppercase', marginBottom: 12 }}>✨ A life lived with love</p>
        <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#4A2C2A', lineHeight: 1.2 }}>Our Story Through Time</h2>
      </motion.div>
      <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
        <div className="timeline-line" />
        {MEMORIES.map((memory, i) => (<TimelineCard key={i} memory={memory} index={i} />))}
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, type: 'spring', stiffness: 200 }} style={{ textAlign: 'center', marginTop: 20, fontSize: '2.4rem' }}>💛</motion.div>
    </section>
  );
}
