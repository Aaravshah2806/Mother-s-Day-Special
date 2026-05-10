/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'rose-gold': '#D4A574',
        'warm-brown': '#4A2C2A',
        blush: '#E8C5A0',
        'deep-rose': '#C4856A',
        'soft-gold': '#F5D5A0',
        'garden-green': '#7DAF7A',
        'garden-light': '#B8D8B5',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        warm: '0 4px 32px rgba(74, 44, 42, 0.12), 0 2px 8px rgba(212, 165, 116, 0.15)',
        'warm-lg': '0 8px 48px rgba(74, 44, 42, 0.18), 0 4px 16px rgba(212, 165, 116, 0.2)',
        glow: '0 0 40px rgba(212, 165, 116, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'heart-rise': 'heartRise 4s ease-out forwards',
        'petal-open': 'petalOpen 0.6s ease-out forwards',
        'candle-flicker': 'candleFlicker 2s ease-in-out infinite',
        'cloud-drift': 'cloudDrift 20s linear infinite',
        'butterfly': 'butterfly 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        heartRise: {
          '0%': { transform: 'translateY(0) scale(0)', opacity: '1' },
          '100%': { transform: 'translateY(-400px) scale(1.2)', opacity: '0' },
        },
        petalOpen: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        candleFlicker: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        butterfly: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(30px) translateY(-20px) rotate(15deg)' },
          '50%': { transform: 'translateX(60px) translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateX(30px) translateY(20px) rotate(-15deg)' },
        },
      },
    },
  },
  plugins: [],
}
