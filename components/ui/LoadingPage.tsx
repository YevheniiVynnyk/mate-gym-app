import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

// 💡 Утилита для условного объединения классов (аналог clsx)
const cn = (
  ...inputs: (string | Record<string, any> | null | undefined)[]
): string => {
  const classes: string[] = [];
  for (const input of inputs) {
    if (typeof input === "string" && input.trim()) {
      classes.push(input);
    } else if (typeof input === "object" && input !== null) {
      for (const key in input) {
        if (
          Object.prototype.hasOwnProperty.call(input, key) &&
          (input as any)[key]
        ) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
};

/**
 * Адаптивный компонент страницы загрузки.
 * Отображает ActivityIndicator и сообщение о загрузке.
 */
export const LoadingPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // ✅ Адаптивный класс для фона (flex-1 занимает весь экран)
  const containerClasses = cn(
    "flex-1 items-center justify-center",
    "bg-background", // Light тема
    "dark:bg-gray-900", // Dark тема
    "ocean:bg-ocean-background" // Ocean тема
  );

  // ✅ Адаптивный цвет для ActivityIndicator и текста
  const indicatorColor =
    theme === "ocean" ? "#4a7090" : theme === "dark" ? "#00c3ff" : "#007AFF";

  const textClasses = cn(
    "mt-4 text-base",
    "text-gray-500", // Light тема
    "dark:text-gray-400", // Dark тема
    "ocean:text-ocean-foreground" // Ocean тема
  );

  return (
    <View className={containerClasses}>
      <ActivityIndicator size="large" color={indicatorColor} />
      <Text className={textClasses}>{t("loadingText")}</Text>
    </View>
  );
};
