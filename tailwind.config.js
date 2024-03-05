/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'trans-top': {
          '0%': { transform: 'translateY(-100%)', opacity: '0.1' },
          '20%': { transform: 'translateY(-70%)', opacity: '0.2' },
          '40%': { transform: 'translateY(-50%)', opacity: '0.4' },
          '60%': { transform: 'translateY(-30%)', opacity: '0.6' },
          '80%': { transform: 'translateY(-10%)', opacity: '0.8' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        }
      },
      animation: {
        'trans-top': 'trans-top 0.8s linear 1 forwards'
      }
    },
  },
  plugins: [],
}

