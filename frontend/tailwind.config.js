/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E63946", // Rojo fuerte
        secondary: "#4A90E2", // Azul frío
        background: "#1A1A1A", // Fondo negro
        textPrimary: "#FFFFFF", // Texto principal blanco
        textSecondary: "#8D99AE", // Gris metálico
        cardBg: "#2E2E2E", // Fondo de tarjetas
      },
    },
  },
  plugins: [],
};
