/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '440px',
      },
      colors: {
        brand: {
          orange: '#ff5421',
          'orange-bright': '#ff6f04',
          'orange-deep': '#ae500a',
          'orange-subtle': '#fae3d2',
          blue: '#0066ff',
          'blue-dark': '#0052cc',
          'blue-light': '#eff6ff',
          cyan: '#38bdf8',
        },
        navy: {
          deep: '#060c18',
          card: '#0a1224',
          surface: '#0f1b33',
          border: '#1a2847',
        },
        dark: {
          pure: '#000000',
          charcoal: '#090f1d',
          surface: '#111927',
          card: '#152033',
          border: '#1f2e48',
        },
        surface: {
          light: '#f4f7fb',
          muted: '#eef2f6',
          secondary: '#f9fbfd',
        }
      },
      fontFamily: {
        brand: ['Michroma', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'sonar-ping': 'sonarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'orbit': 'orbit 6s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sonarPing: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        }
      }
    }
  },
  plugins: [],
}
