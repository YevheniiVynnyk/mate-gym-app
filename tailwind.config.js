/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  // Используем nativewind/preset для совместимости с React Native
  presets: [require("nativewind/preset")],

  // Включаем Dark Mode с использованием класса (для совместимости с NativeWind/Expo)
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // --- БАЗОВАЯ (СВЕТЛАЯ) ТЕМА ---
        // Эти цвета будут использоваться по умолчанию (без префиксов dark: или ocean:)

        // Фон, текст и рамки
        border: "hsl(214.3 31.8% 91.4%)", // gray-200ish
        input: "hsl(210 40% 96.1%)", // gray-100ish
        ring: "hsl(142.1 76.2% 36.3%)", // primary color for focus/ring
        background: "hsl(210,20%,98%)", //  ///#F9FAFB
        foreground: "hsl(222.2 47.4% 11.2%)", // dark text

        // Карточки и разделы
        card: {
          DEFAULT: "hsl(0 0% 100%)", // white
          foreground: "hsl(222.2 47.4% 11.2%)", // dark text
        },

        // Отключенные/приглушенные элементы
        muted: {
          DEFAULT: "hsl(210 40% 96.1%)", // light gray background
          foreground: "hsl(215.4 16.3% 46.9%)", // muted gray text
        },

        // Акцентные цвета и кнопки
        accent: {
          DEFAULT: "hsl(210 40% 96.1%)", // light gray
          foreground: "hsl(222.2 47.4% 11.2%)", // dark text
        },

        // Основной цвет (Ваш #4ADE80)
        primary: {
          DEFAULT: "#4ADE80", // Light Green
          foreground: "#ffffff", // White text on primary
          // Добавляем оттенки для dark mode (если используются dark:bg-primary-600)
          500: "#22C55E",
          600: "#16A34A", // Темнее, для использования в dark:bg-primary-600
        },

        // --- DARK MODE (С ИСПОЛЬЗОВАНИЕМ ПРЕФИКСА dark:) ---
        // Эти цвета автоматически переопределяют базовые с префиксом dark:
        // Например: dark:bg-background
        dark: {
          background: "hsl(224 71.4% 4.1%)", // Very dark blue/gray
          foreground: "hsl(213 31% 91%)", // Light text
          card: "hsl(224 71.4% 4.1%)", // Same as background
          muted: "hsl(215 27.9% 16.9%)", // Slightly lighter dark background
          primary: {
            DEFAULT: "#4ADE80", // Используем тот же акцент, но на темном фоне
            foreground: "hsl(222.2 47.4% 11.2%)", // Dark text (если нужен)
          },
        },

        // --- CUSTOM OCEAN THEME (С ИСПОЛЬЗОВАНИЕМ ПРЕФИКСА ocean:) ---
        // Эти цвета будут применены только к элементам с классом 'ocean'
        ocean: {
          background: "#001f3f", // Темно-синий фон
          foreground: "#b3e5fc", // Светлый текст

          // Акцентный цвет Ocean (Ваш #33c9ff)
          primary: {
            DEFAULT: "#33c9ff", // Яркий синий акцент
            foreground: "#ffffff",
          },

          card: {
            DEFAULT: "#003366", // Темная синяя карточка
            foreground: "#b3e5fc",
          },

          // Фон для вкладок/ввода
          muted: {
            DEFAULT: "#005080", // Cиний для muted
            foreground: "#b3e5fc",
          },

          // Фон для вкладок/ввода (если они должны быть светлее)
          input: "#005080",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
      },

      // Добавляем поддержку кастомного префикса 'ocean'
      // Важно: NativeWind должен быть настроен на поддержку произвольных префиксов
      // Если это не работает, вам придется использовать ocean-background: "#001f3f"
      // вместо ocean:background: "#001f3f"
    },
  },
  plugins: [],
};
