/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // For components
    "./app/**/*.{js,ts,jsx,tsx}", // If using Next.js app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
