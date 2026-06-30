// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#13131a',
          700: '#1c1c26',
        },
        primary: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        priority: {
          urgent: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#3b82f6',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
