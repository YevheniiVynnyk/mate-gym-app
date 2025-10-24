import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// Импортируем наш новый хук
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const { t } = useTranslation();

  // ✅ АДАПТАЦИЯ: Определяем адаптивные классы для активного/неактивного состояния
  const activeClass =
    "bg-primary border-primary text-primary-foreground " +
    "dark:bg-primary-600 dark:border-primary-600 dark:text-white " +
    "ocean:bg-ocean-primary ocean:border-ocean-primary ocean:text-ocean-primary-foreground";

  const inactiveClass =
    "bg-card border-border text-foreground " +
    "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 " +
    "ocean:bg-ocean-card ocean:border-blue-700 ocean:text-ocean-foreground";

  return (
    <View className="flex-row flex-wrap my-2">
      {themes.map((tItem) => (
        <TouchableOpacity
          key={tItem.value}
          className={`px-4 py-2 m-1 border rounded-md ${
            theme === tItem.value ? activeClass : inactiveClass
          }`}
          onPress={() => setTheme(tItem.value)}
        >
          <Text
            className={`font-medium ${
              theme === tItem.value
                ? "text-primary-foreground dark:text-white" // Активный текст (белый/светлый)
                : "text-foreground dark:text-gray-100 ocean:text-ocean-foreground" // Неактивный текст (по цвету темы)
            }`}
          >
            {t(`ThemeSelector.${tItem.value}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
