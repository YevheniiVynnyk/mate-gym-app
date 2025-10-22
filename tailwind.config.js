/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  // ВАЖНО: Добавляем 'class' для поддержки dark mode
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // --- Общие цвета (по умолчанию) ---
        border: "#e5e7eb",
        input: "#f3f4f6",
        ring: "#10b981",
        background: "#f0f4f8",
        foreground: "#111827",

        // --- Светлая тема (используется по умолчанию, если не указано dark/ocean) ---
        primary: {
          DEFAULT: "#4ADE80",
          foreground: "#ffffff",
        },
        // ... (остальные цвета)

        // --- Цвета Dark Mode (используем префикс dark:) ---
        // Например: dark:bg-background

        // --- Кастомная тема Ocean (используем префикс ocean:) ---
        // Эти цвета будут применены только к элементам с классом 'ocean'
        ocean: {
          background: "#001f3f", // Темно-синий фон
          foreground: "#b3e5fc", // Светлый текст
          primary: {
            DEFAULT: "#33c9ff", // Яркий синий акцент
            foreground: "#ffffff",
          },
          card: {
            DEFAULT: "#003366", // Темная синяя карточка
            foreground: "#b3e5fc",
          },
        },

        // Переопределение базовых цветов для Dark Mode
        // Это позволяет использовать bg-background и dark:bg-background
        // ВАЖНО: ЭТО ДОБАВЛЕНО ДЛЯ ДЕМОНСТРАЦИИ dark:
        background: {
          DEFAULT: "#f0f4f8", // Light
          dark: "#111827", // Dark
          ocean: "#001f3f", // Ocean
        },
        foreground: {
          DEFAULT: "#111827", // Light
          dark: "#f9fafb", // Dark
          ocean: "#b3e5fc", // Ocean
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
      },
    },
  },
  // Добавляем 'class' для активации dark mode через классы
  plugins: [],
};
