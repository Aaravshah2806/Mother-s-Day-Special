// All placeholder content for the House of Memories
// Using Unsplash for stock photos — no API key needed for direct image URLs

export const ROOMS = {
  bedroom: {
    id: 'bedroom',
    label: 'Bedroom',
    emoji: '🕯️',
    color: 'from-amber-950 to-rose-950',
    tagline: 'Where love lives quietly',
  },
  livingRoom: {
    id: 'livingRoom',
    label: 'Living Room',
    emoji: '📺',
    color: 'from-stone-900 to-amber-950',
    tagline: 'Where memories were made',
  },
  garden: {
    id: 'garden',
    label: 'Garden',
    emoji: '🌸',
    color: 'from-emerald-950 to-green-800',
    tagline: 'Where wishes bloom',
  },
};

export const BEDROOM_DATA = {
  letter: `Dear Mama,

There are no words grand enough to hold everything you mean to me — so I'll start with the smallest things.

The way you always knew when something was wrong, even before I did. The way you made every house feel like home. The way you never stopped believing in me, even when I forgot to believe in myself.

You taught me that love isn't a feeling — it's a thousand quiet choices made every single day. And you made every one of them beautifully.

Thank you for every lullaby, every warm meal, every hand held in the dark. Thank you for being the kind of mother that makes a child feel like they could do anything.

Today, I just want you to know: you are the reason I know what love looks like.

Happy Mother's Day. 💛

With all my heart, always.`,

  photos: [
    {
      url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
      caption: 'Little moments',
    },
    {
      url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
      caption: 'Pure joy',
    },
    {
      url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80',
      caption: 'Growing up',
    },
    {
      url: 'https://images.unsplash.com/photo-1533854775446-95c4609da544?w=400&q=80',
      caption: 'Together',
    },
    {
      url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&q=80',
      caption: 'Childhood',
    },
    {
      url: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=400&q=80',
      caption: 'Sunshine days',
    },
  ],

  quote: "\u201cA mother\u2019s love is the fuel that enables a normal human being to do the impossible.\u201d",
};

export const LIVING_ROOM_DATA = {
  slides: [
    {
      url: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=800&q=80',
      caption: 'Family Sundays',
    },
    {
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
      caption: 'Celebrations',
    },
    {
      url: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&q=80',
      caption: 'Holidays together',
    },
    {
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80',
      caption: 'Laughing until it hurts',
    },
  ],

  polaroids: [
    {
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80',
      caption: '💛 Summer 2018',
      rotation: '-6deg',
    },
    {
      url: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=300&q=80',
      caption: '🌸 Family Trip',
      rotation: '4deg',
    },
    {
      url: 'https://images.unsplash.com/photo-1484665341500-c8d73e4c9765?w=300&q=80',
      caption: '🎂 Birthday',
      rotation: '-3deg',
    },
    {
      url: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=300&q=80',
      caption: '✨ Always',
      rotation: '7deg',
    },
  ],
};

export const GARDEN_DATA = {
  flowers: [
    {
      id: 1,
      color: '#FF9EBB',
      stemColor: '#5A8A5A',
      wish: 'May every day bring you as much joy as you bring to everyone around you. 🌸',
      x: 15,
      y: 65,
    },
    {
      id: 2,
      color: '#FFD700',
      stemColor: '#4A7A4A',
      wish: 'Wishing you health, happiness, and a thousand more sunny mornings. ☀️',
      x: 30,
      y: 70,
    },
    {
      id: 3,
      color: '#FF7BAC',
      stemColor: '#6A9A6A',
      wish: 'Thank you for every sacrifice you never let me see. 💛',
      x: 50,
      y: 60,
    },
    {
      id: 4,
      color: '#C8A2FF',
      stemColor: '#5A8A5A',
      wish: 'Your love is the garden where I learned to grow. 🌷',
      x: 68,
      y: 72,
    },
    {
      id: 5,
      color: '#FF6B9D',
      stemColor: '#4A7A4A',
      wish: 'You are my home — no matter where life takes me. 🏡',
      x: 83,
      y: 65,
    },
    {
      id: 6,
      color: '#FFA07A',
      stemColor: '#6A9A6A',
      wish: 'I love you more than every flower in every garden in the world. 🌺',
      x: 95,
      y: 68,
    },
  ],
};
