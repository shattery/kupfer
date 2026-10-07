/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        copper: {
          50: '#fbf6f0',
          100: '#f4e6d4',
          200: '#e8c9a8',
          300: '#d97736',
          400: '#c86a32',
          500: '#b87333',
          600: '#9a5a28',
          700: '#7c4822',
          800: '#5e371b',
          900: '#3f2512',
          950: '#24150a',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        copper: '0 12px 32px -12px rgba(184, 115, 51, 0.45)',
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -16px rgba(15, 23, 42, 0.12)',
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      backgroundImage: {
        'copper-metal':
          'linear-gradient(135deg, #e8b07a 0%, #d97736 28%, #c86a32 52%, #b87333 76%, #9a5a28 100%)',
        'hero-grid':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
