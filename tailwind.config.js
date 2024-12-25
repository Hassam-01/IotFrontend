/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}'  // This ensures Tailwind scans your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
