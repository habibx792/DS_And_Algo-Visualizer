/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
     animation: {
  typing: 'typing 5s steps(40, end) forwards', // slower typing
  blink: 'blink 0.5s step-end infinite', // faster cursor blink
},
    },
  },
  plugins: [],
};
