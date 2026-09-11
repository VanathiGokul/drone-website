/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0A0A0B',
          dark: '#0D0E10',
          darker: '#121418',
          card: '#111215',
          cardBorder: 'rgba(255, 255, 255, 0.08)',
          orange: '#EC8922',
          orangeLight: '#F3AC4A',
          orangeGlow: 'rgba(236, 137, 34, 0.25)',
          muted: '#7A7A85',
          secondary: '#969BA7',
          light: '#C1C1C1',
          silver: '#D5D5D5',
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 30%, rgba(236, 137, 34, 0.08) 0%, rgba(10, 10, 11, 0) 70%)',
      }
    },
  },
  plugins: [],
}
