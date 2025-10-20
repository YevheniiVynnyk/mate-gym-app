module.exports = {
  // Указываем парсер для TypeScript
  parser: '@typescript-eslint/parser',
  extends: [
    // Настройки для TypeScript
    'plugin:@typescript-eslint/recommended',
    // Настройки для React (включает JSX)
    'plugin:react/recommended',
    // Настройки для React Native
    'plugin:react-native/all',
    // Отключает правила ESLint, которые конфликтуют с Prettier
    'prettier', 
    'plugin:prettier/recommended', // Включает prettier как правило ESLint и выводит ошибки
  ],
  plugins: [
    'react', 
    'react-native', 
    '@typescript-eslint', 
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020, 
    sourceType: 'module',
  },
  root: true, // Указывает, что это корневой файл конфигурации
  rules: {
    // Включаем ошибки форматирования от Prettier
    'prettier/prettier': ['error', {
        "trailingComma": "all",
        "tabWidth": 4,
        "semi": true,
        "singleQuote": true,
        "jsxSingleQuote": false,
        "printWidth": 100,
        "arrowParens": "always"
    }],
    
    // Общие правила
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off', // Отключаем, так как используем TypeScript
    'react-native/no-raw-text': 'off', // Часто отключают, чтобы не ругался на текст
    
    // TypeScript Specific Rules
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Слишком строго
    '@typescript-eslint/no-explicit-any': 'off', // Разрешаем 'any'
  },
  // Настройки для React Native
  settings: {
    react: {
      version: 'detect', // Автоматическое определение версии React
    },
    'react-native/host-platform': 'all', // Для всех платформ
  },
};