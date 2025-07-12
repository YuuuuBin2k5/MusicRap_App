/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0e0e10",
        neon: "#00f2fe",
        soft: "#9e9e9e",
      },
      fontFamily: {
        futuristic: ['"Orbitron"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 255, 255, 0.4)",
      },
    },
  },
  plugins: [],
};
