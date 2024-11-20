/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelGreen: '#A0E2B0',
        pastelRed: '#FAA4A3',
      },
    },
  },
  plugins: [],
}