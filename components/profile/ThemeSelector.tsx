import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// Импортируем наш новый хук
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const { t } = useTranslation();

  return (
    <View className="flex-row flex-wrap my-2">
      {themes.map((tItem) => (
        <TouchableOpacity
          key={tItem.value}
          className={`p-2 m-1 border rounded-md border-blue-500 
            ${theme === tItem.value ? "bg-blue-500" : "bg-white dark:bg-gray-700"}
          `}
          onPress={() => setTheme(tItem.value)}
        >
          <Text
            className={`
              ${theme === tItem.value ? "text-white" : "text-blue-500 dark:text-gray-300"}
            `}
          >
            {t(`ThemeSelector.${tItem.value}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
