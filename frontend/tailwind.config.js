export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 90px rgba(124, 58, 237, 0.28)',
      },
      animation: {
        drift: 'drift-slow 12s ease-in-out infinite',
      },
      keyframes: {
        'drift-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
