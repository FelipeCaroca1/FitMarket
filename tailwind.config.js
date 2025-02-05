/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a",
        neonBlue: "#00eaff",
        neonPurple: "#ff00ff",
        neonGreen: "#39ff14",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
