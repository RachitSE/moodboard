/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#E4D9FF',
        seafoam: '#D8FFF2',
        peach: '#FFE8D6',
        mist: '#F5F7FA',
        night: '#1A1A2E',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        xl: "1.25rem",
        '2xl': '2rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
      },
    },
  },
  plugins: [],
}
