// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Si usas el App Router de Next.js
    './pages/**/*.{js,ts,jsx,tsx}', // Si usas el Pages Router de Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
