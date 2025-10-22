import React, { createContext, useContext, useEffect, useState } from "react";
// Импортируем 'useColorScheme' из nativewind/dist/style-sheet
// Это позволяет Nativewind управлять классом 'dark' на корневом элементе RN.
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Определяем допустимые темы
type Theme = "light" | "dark" | "ocean";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { value: Theme; label: string }[];
  // Поле из Nativewind, необходимое для управления 'dark' классом
  setColorScheme: (scheme: "light" | "dark") => void;
}

const THEME_STORAGE_KEY = "user-app-theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- Наш Хук ---
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// --- Провайдер Темы ---
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Используем хук Nativewind для управления системным классом 'dark'
  const { colorScheme, setColorScheme } = useColorScheme();

  // Храним фактическую тему (light, dark, ocean)
  const [theme, setThemeState] = useState<Theme>("light");

  const themes = [
    { value: "light" as Theme, label: "Светлая" },
    { value: "dark" as Theme, label: "Тёмная" },
    { value: "ocean" as Theme, label: "Океан (Своя)" },
  ];

  // 1. Загрузка темы при старте
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = (await AsyncStorage.getItem(
          THEME_STORAGE_KEY
        )) as Theme | null;
        if (storedTheme && themes.some((t) => t.value === storedTheme)) {
          setThemeState(storedTheme);
          // Устанавливаем базовую схему для Nativewind
          setColorScheme(storedTheme === "dark" ? "dark" : "light");
        } else {
          // Если нет темы, устанавливаем базовый Nativewind (по умолчанию 'light')
          setColorScheme("light");
        }
      } catch (e) {
        console.error("Failed to load theme from storage", e);
      }
    };
    loadTheme();
  }, []);

  // 2. Функция для изменения темы
  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);

    // Обновляем AsyncStorage
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error("Failed to save theme to storage", e);
    }

    // ВАЖНО: Nativewind поддерживает только 'light' или 'dark' для базового класса.
    // Если мы выбираем 'ocean' (которая является нашей кастомной), мы оставляем
    // базовую схему 'light', но стили 'ocean' берем из нашего Tailwind.config
    setColorScheme(newTheme === "dark" ? "dark" : "light");
  };

  // 3. Эффект для применения кастомного класса (ocean) на Root View
  // Nativewind применит класс 'dark' автоматически. Нам нужно вручную
  // управлять только кастомными классами ('ocean').
  // Для этого мы будем использовать корневой компонент в RootLayout.

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
