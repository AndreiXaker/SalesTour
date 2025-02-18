/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dbf0db',
          200: '#bde2bd',
          300: '#92ce92',
          400: '#64b364',
          500: '#48954b',
          600: '#37793c',
          700: '#2f6134',
          800: '#294e2e',
          900: '#234227',
        }
      }
    },
  },
  plugins: [],
};