import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext"; // ✅ Импортируем хук темы

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, text }) => {
  const { theme } = useTheme();

  // Адаптивные классы для фона карточки
  const cardBgClass = "bg-white dark:bg-gray-800 ocean:bg-ocean-card-DEFAULT";

  // Адаптивные классы для основного текста (заголовок)
  const titleTextClass =
    "text-black dark:text-gray-100 ocean:text-ocean-foreground";

  // Адаптивные классы для приглушенного текста (описание)
  // Используем явную логику, чтобы точно контролировать цвет в кастомных темах
  const mutedTextClass =
    theme === "dark"
      ? "text-gray-400"
      : theme === "ocean"
        ? "text-blue-200"
        : "text-gray-500";

  return (
    <View
      // ✅ АДАПТАЦИЯ: Применяем адаптивный фон и m-1 для согласования с FeaturesList
      className={`
        flex-1 ${cardBgClass}
        rounded-xl p-3 m-1 items-center
      `}
    >
      {icon}
      {/* ✅ АДАПТАЦИЯ: Применяем адаптивный цвет заголовка */}
      <Text className={`text-sm font-semibold mt-2 ${titleTextClass}`}>
        {title}
      </Text>
      {/* ✅ АДАПТАЦИЯ: Применяем адаптивный цвет приглушенного текста */}
      <Text className={`text-xs text-center mt-1 ${mutedTextClass}`}>
        {text}
      </Text>
    </View>
  );
};

export default Feature;
