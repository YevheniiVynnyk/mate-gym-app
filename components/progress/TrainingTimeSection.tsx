import { Text, View } from "react-native";
import { Clock } from "lucide-react-native";
import React from "react";

export default function TrainingTimeSection() {
  return (
    // ✅ Адаптивный фон: bg-card, скругление, тень и граница
    <View
      className="bg-card dark:bg-gray-800 ocean:bg-ocean-card 
                 p-4 rounded-xl mb-10 border border-border dark:border-gray-700"
    >
      <View className="flex-row items-center mb-2">
        {/* ✅ Адаптивный цвет для иконки (Primary) */}
        <Clock
          size={20}
          className="text-primary dark:text-green-500 ocean:text-ocean-primary"
        />
        {/* ✅ Адаптивный цвет для заголовка (Foreground) */}
        <Text className="ml-2 text-lg text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Время тренировок
        </Text>
      </View>

      {/* ✅ Адаптивный текст для placeholder (muted-foreground) */}
      <Text className="text-center text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70">
        Данные скоро будут доступны
      </Text>
    </View>
  );
}
