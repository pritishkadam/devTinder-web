/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bannerImage: "url('./assets/tinder.png')",
        blackOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    base: false, // applies background color and foreground color for root element by default
  },
};
