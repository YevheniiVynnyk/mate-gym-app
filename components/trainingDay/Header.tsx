import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const Header = ({
  onBack,
  title,
}: {
  onBack: () => void;
  title: string;
}) => {
  // --- Адаптивные классы ---
  // Фон и рамка кнопки "Назад" (используем стили карточки)
  const backButtonClasses =
    "bg-card border-border " +
    "dark:bg-gray-700 dark:border-gray-600 " +
    "ocean:bg-ocean-card ocean:border-blue-700";

  // Текст кнопки "Назад" (используем приглушенный цвет)
  const backButtonTextClasses =
    "text-muted-foreground font-medium " +
    "dark:text-gray-300 " +
    "ocean:text-ocean-foreground";

  // Текст заголовка (используем основной цвет)
  const titleTextClasses =
    "text-foreground " + "dark:text-gray-100 " + "ocean:text-ocean-foreground";

  return (
    // Добавлен отступ pt-4 и px-4 для лучшей компоновки
    <View className="flex-row items-center justify-between mb-4 px-4 pt-4">
      <TouchableOpacity
        onPress={onBack}
        // ✅ РЕФАКТОРИНГ: Применяем адаптивные классы для фона и рамки
        className={`rounded-xl px-4 py-2 border flex-row items-center justify-center ${backButtonClasses}`}
      >
        <Text
          // ✅ РЕФАКТОРИНГ: Применяем адаптивные классы для текста кнопки
          className={backButtonTextClasses}
        >
          Назад
        </Text>
      </TouchableOpacity>

      <Text
        // ✅ РЕФАКТОРИНГ: Применяем адаптивные классы для текста заголовка
        className={` absolute left-1/2 -translate-x-1/2 ${titleTextClasses}`}
      >
        {title}
      </Text>
    </View>
  );
};
