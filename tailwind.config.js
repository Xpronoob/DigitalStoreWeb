/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '',
        secondary: {
          300: '',
          600: '',
          900: ''
        }
      }
    }
  },
  plugins: []
};
