/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ember: {
          black: '#111110',
          paper: '#E8E6E1',
          muted: '#8A8782',
          orange: '#D9622B',
          line: 'rgba(232, 230, 225, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica Neue', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      letterSpacing: { editorial: '-0.055em' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
