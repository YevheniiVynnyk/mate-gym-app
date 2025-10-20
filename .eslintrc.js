module.exports = {
  // ... (существующие настройки)

  // Обновляем секцию plugins:
  plugins: [
    "react",
    "react-native",
    "@typescript-eslint",
    "prettier",
    "import", // ✅ ДОБАВЛЯЕМ ПЛАГИН IMPORT
  ],

  // ... (parserOptions и root)

  // ... (rules)

  // ✅ НОВАЯ/ОБНОВЛЕННАЯ СЕКЦИЯ settings:
  settings: {
    react: {
      version: "detect",
    },
    "react-native/host-platform": "all",
    // 🎯 УКАЗЫВАЕМ ESLINT ИСПОЛЬЗОВАТЬ tsconfig.json ДЛЯ РАЗРЕШЕНИЯ ПУТЕЙ
    "import/resolver": {
      typescript: {
        // Указываем путь к вашему tsconfig.json (по умолчанию он в корне)
        project: "./tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
