/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bold: ['BebasNeue-Bold', 'sans-serif'],
        regular: ['BebasNeue-Regular', 'sans-serif'],
        light: ['BebasNeue-Light', 'sans-serif'],
      },
      colors: {
        black: '#242424',
      },
    },
  },
  plugins: [],
};
