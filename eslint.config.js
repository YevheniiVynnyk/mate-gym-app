// ВАЖНО: Установите необходимые пакеты, если они еще не установлены:
// npm install --save-dev eslint-plugin-prettier eslint-config-prettier eslint-plugin-import

const { defineConfig } = require("eslint/config");
// Импортируем базовую конфигурацию Expo
const expoConfig = require("eslint-config-expo/flat");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  // 1. БАЗОВАЯ КОНФИГУРАЦИЯ EXPO (включает React, TS, и многое другое)
  expoConfig,

  // 2. ИГНОРИРОВАНИЕ ФАЙЛОВ
  {
    // Добавляем игнорирование стандартных файлов конфигурации
    ignores: ["dist/*", "node_modules/", "babel.config.js", "metro.config.js", "eas.json", "app.json"],
  },

  // 3. КОНФИГУРАЦИЯ ИМПОРТОВ И ПРАВИЛ КОДА
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Применяем только к файлам кода
    
    // СЕКЦИЯ SETTINGS (из вашего .eslintrc.js)
    // Это критически важно для разрешения путей TypeScript (alias'ы)
    settings: {
      react: {
        version: "detect", // Позволяет ESLint автоматически определять версию React
      },
      "react-native/host-platform": "all",
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // Указываем ESLint путь к файлу tsconfig.json
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    
    // ПРАВИЛА
    rules: {
      // Пример пользовательского правила: запретить неиспользуемые переменные
      "@typescript-eslint/no-unused-vars": "warn",
      // Отключаем правила, которые часто конфликтуют в Expo/TS
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  // 4. ИНТЕГРАЦИЯ PRETTIER (ДОЛЖЕН ИДТИ ПОСЛЕДНИМ)
  // Этот блок отключает все правила ESLint, конфликтующие с Prettier, 
  // и включает Prettier как правило линтера.
  {
    files: ["**/*.{js,jsx,ts,tsx,json,css,md}"],
    plugins: {
        prettier: prettierPlugin,
    },
    extends: [
        // Отключает правила ESLint, конфликтующие с Prettier
        prettierConfig, 
    ],
    rules: {
        // Включает плагин Prettier, чтобы ошибки форматирования отображались как ошибки линтера
        'prettier/prettier': 'error'
    },
  },
]);