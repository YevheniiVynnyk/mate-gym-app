import React from "react";
import { Text, View } from "react-native";
import { Clock } from "lucide-react-native";
// Предполагается, что cn и CardUI доступны (хотя CardUI не используется, cn может быть полезен)
// import { cn } from "@/components/ui/CardUI";
import { formatTime } from "@/hooks/useTrainingDay";

export default function TrainingTimer({ time }: { time: number }) {
  // Определяем адаптивные классы для фона иконки/блока:
  // Используем светлый фон с синим акцентом (info)
  const backgroundClasses =
    "bg-blue-100 dark:bg-blue-900/50 ocean:bg-ocean-info/30";

  // Определяем адаптивные классы для текста:
  const textClasses =
    "text-blue-700 dark:text-blue-200 ocean:text-ocean-foreground";

  // Определяем цвет иконки (соответствует info)
  const iconColor =
    "text-blue-500 dark:text-blue-400 ocean:text-ocean-info ml-4";

  // Поскольку в React Native Tailwind нет прямого доступа к CSS-переменным,
  // используем заглушку, которая должна быть заменена на фактический цвет из iconColor
  const iconHexColor = "#3B82F6"; // blue-500 - для простоты примера

  return (
    <View className={`flex-row items-center p-1 mb-4  ${backgroundClasses}`}>
      {/* Используем className для цвета иконки, если он поддерживается
        или жестко задаем цвет, если flex-native-tailwind не поддерживает 
        динамическое применение цвета иконки через классы (зависит от вашей настройки)
      */}
      <Clock size={20} color={iconHexColor} className={iconColor} />

      <Text className={`ml-3 text-lg font-semibold ${textClasses}`}>
        {formatTime(time)}
      </Text>
    </View>
  );
}
