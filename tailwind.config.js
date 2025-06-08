/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Using standard hex colors instead of oklab
        'blue': {
          400: '#60a5fa',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'gray': {
          200: '#e5e7eb',
        },
        'white': '#ffffff',
        'black': '#000000',
      },
    },
  },
  plugins: [],
} 