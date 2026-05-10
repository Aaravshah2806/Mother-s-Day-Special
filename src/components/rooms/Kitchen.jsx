import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditableText from '../ui/EditableText';

const RECIPES = [
  { name: "Mama's Dal", emoji: '🍲', description: 'No restaurant in the world has ever come close. The warmth of this bowl is home itself.', memory: 'I remember coming home on cold evenings — the whole house smelled of this. It was like a hug in a bowl.', ingredients: ['Love', 'Patience', 'Turmeric', 'A secret spice only you know', '... and warmth'], color: '#FFD580' },
  { name: 'Birthday Cake', emoji: '🎂', description: 'Every birthday, without fail. Always the right flavour. Always better than store-bought.', memory: 'You stayed up late every year to bake it. We never had to ask. You just knew.', ingredients: ['Flour', 'Butter', 'Sugar', 'Dedication', '... and a whole lot of love'], color: '#FFB3D9' },
  { name: 'Sunday Morning Breakfast', emoji: '🍳', description: 'The sizzle from the kitchen would wake us up better than any alarm clock.', memory: 'Sundays were sacred. The whole family at the table. The best mornings of my life.', ingredients: ['Eggs', 'Butter', 'Bread', 'Chai', '... and your laughter'], color: '#A8D4F5' },
  { name: 'Comfort Soup', emoji: '🥣', description: 'Whenever I was sick, this appeared. Medicine in a bowl. Magic in a spoon.', memory: 'You could tell when something was wrong even before I said a word. This soup appeared every time.', ingredients: ['Ginger', 'Garlic', 'Lemon', 'Care', '... and a knowing heart'], color: '#7DAF7A' },
];

function RecipeCard({ recipe, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} style={{ perspective: 1000, cursor: 'none' }} onClick={() => setFlipped(f => !f)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ position: 'relative', transformStyle: 'preserve-3d', height: 280 }}>
        {/* Front */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: `linear-gradient(135deg, ${recipe.color}22, ${recipe.color}44)`, border: `1px solid ${recipe.color}66`, borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>{recipe.emoji}</div>
          <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.25rem', fontWeight: 700, color: '#F5D5A0', marginBottom: 12 }}>
            <EditableText dataKey={`kitchen_name_${index}`} defaultValue={recipe.name} />
          </h3>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#E8C5A0', lineHeight: 1.6, marginBottom: 16 }}>
            <EditableText dataKey={`kitchen_desc_${index}`} defaultValue={recipe.description} />
          </div>
          <div style={{ fontSize: '0.72rem', color: recipe.color, fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8 }}>Tap to see the secret →</div>
        </div>
        {/* Back */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'rgba(255,253,240,0.96)', borderRadius: 20, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(transparent, transparent 27px, rgba(212,165,116,0.15) 27px, rgba(212,165,116,0.15) 28px)', borderRadius: 20, pointerEvents: 'none' }} />
          <div>
            <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: '0.88rem', color: '#4A2C2A', lineHeight: 1.8, marginBottom: 16, position: 'relative' }}>
              "<EditableText dataKey={`kitchen_memory_${index}`} defaultValue={recipe.memory} />"
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', color: '#D4A574', textTransform: 'uppercase', marginBottom: 8 }}>Secret ingredients:</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#7A5040', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: recipe.color }}>•</span>{ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#C4856A', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Tap to flip back ↩</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Kitchen() {
  return (
    <div style={{ color: 'white', maxWidth: 900, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>👩‍🍳</div>
        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#F5D5A0', marginBottom: 8 }}>Recipes From the Heart</h3>
        <p style={{ color: '#D4A574', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Tap each card to discover the secret ingredient 🍴</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: 24, letterSpacing: 8 }}>~~~</motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
        {RECIPES.map((recipe, i) => (<RecipeCard key={i} recipe={recipe} index={i} />))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <EditableText dataKey="kitchen_quote" defaultValue="Your kitchen was never just where food was made — it was where love was cooked daily." as="blockquote" style={{ textAlign: 'center', fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#E8C5A0', padding: '0 32px', lineHeight: 1.8, borderTop: '1px solid rgba(212,165,116,0.2)', paddingTop: 32 }} />
      </motion.div>
      <div style={{ textAlign: 'center', marginTop: 40, fontSize: '1.8rem' }}>🍲 👩‍🍳 💛</div>
    </div>
  );
}
