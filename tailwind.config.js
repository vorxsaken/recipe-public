/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        xSlide: {
          '0%': {left: '-50%'},
          '100%': {left: '150%'}
        }
      },
      animation: {
        xSlide: 'xSlide 1.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}