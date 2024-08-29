/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",  // Adjust as needed to include all your HTML files
    "./src/**/*.{js,jsx,ts,tsx}", // Include paths for your JS files if any
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',  // Example custom color
      },
      spacing: {
        '72': '18rem',  // Example custom spacing
      },
    },
  },
  plugins: [],
}