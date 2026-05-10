import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgba(31, 41, 55, 0.6)',
          hover: 'rgba(31, 41, 55, 0.8)',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        accent: {
          green: '#0AC488',
          blue: '#33A0EA',
        },
        bullish: '#0AC488',
        bearish: '#FF5757',
        primary: '#E0E7FF',
        secondary: '#94A3B8',
        page: '#010510',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #0AC488 0%, #33A0EA 100%)',
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'flash-green': 'flashGreen 0.6s ease-out',
        'flash-red': 'flashRed 0.6s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        flashGreen: {
          '0%': { backgroundColor: 'rgba(10, 196, 136, 0.3)' },
          '100%': { backgroundColor: 'transparent' },
        },
        flashRed: {
          '0%': { backgroundColor: 'rgba(255, 87, 87, 0.3)' },
          '100%': { backgroundColor: 'transparent' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        skeleton: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
