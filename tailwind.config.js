/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#000000', card: '#141414', line: '#262626', mute: '#8c8c8c', soft: '#d9d9d9' },
      fontFamily: {
        display: ['"Fjalla One"', '"Arial Narrow"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: { cine: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
