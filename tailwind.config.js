/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        input: "#f3f4f6",
        ring: "#10b981",
        background: "#f0f4f8",
        foreground: "#111827",
        primary: {
          DEFAULT: "#4ADE80",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#34C759",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"]
      },
    },
  },
  plugins: [],
};
