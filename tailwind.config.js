export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#e6f7f5',
          200: '#cbf0ea',
          500: '#008272',
          600: '#007365',
          700: '#006256',
          800: '#005147',
          900: '#004038',
        }
      }
    },
  },
  plugins: [],
}
