/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          bg1:    '#0F0F0F',
          bg2:    '#1C1C1E',
          bg3:    '#2C2C2E',
          bg4:    '#3A3A3C',
          bg5:    '#48484A',
          border: 'rgba(84,84,88,0.65)',
        },
      },
      boxShadow: {
        'ios-card':  '0 1px 3px rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.25)',
        'ios-modal': '0 4px 6px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.5)',
        'ios-btn':   '0 1px 2px rgba(0,0,0,0.3), 0 3px 8px rgba(0,0,0,0.2)',
        'glow-violet': '0 0 20px rgba(124,58,237,0.35), 0 0 60px rgba(124,58,237,0.15)',
        'glow-sm':    '0 0 12px rgba(124,58,237,0.3)',
      },
      borderRadius: {
        'ios':   '12px',
        'ios-lg':'18px',
        'ios-xl':'22px',
      },
      keyframes: {
        springIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '60%':  { opacity: '1', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(124,58,237,0.3)' },
          '50%':      { boxShadow: '0 0 28px rgba(124,58,237,0.6), 0 0 60px rgba(124,58,237,0.2)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'spring-in':   'springIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-up':    'slideUp 0.28s cubic-bezier(0.16,1,0.3,1) both',
        'slide-down':  'slideDown 0.2s ease both',
        'shimmer':     'shimmer 2s linear infinite',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite',
        'fade-up':     'fadeUp 0.25s ease both',
        'scale-in':    'scaleIn 0.22s ease both',
        'fade-in':     'fadeIn 0.2s ease both',
      },
    },
  },
  plugins: [],
}
