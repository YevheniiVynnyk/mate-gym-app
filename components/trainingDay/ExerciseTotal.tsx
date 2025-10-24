import React from "react";
import { Text, View } from "react-native";

interface ExerciseTotalProps {
  training: {
    trainingDetails: { repetition: number; weight: number }[];
  };
}

export default function ExerciseTotal({ training }: ExerciseTotalProps) {
  if (!training?.trainingDetails?.length) return null;

  const totalReps = training.trainingDetails.reduce(
    (sum, set) => sum + (set.repetition || 0),
    0
  );
  const totalWeight = training.trainingDetails.reduce(
    (sum, set) => sum + (set.repetition || 0) * (set.weight || 0),
    0
  );

  // --- Адаптивные классы ---

  // 1. Основной текст (Цифры: повторения, тоннаж)
  const primaryTextClasses =
    "text-gray-900 " + "dark:text-white " + "ocean:text-ocean-foreground";

  // 2. Второстепенный текст (Заголовок, метки: "Повторений", "Тоннаж")
  const secondaryTextClasses =
    "text-gray-600 " + // Светлый фон
    "dark:text-gray-400 " + // Темный фон
    "ocean:text-ocean-secondary-foreground"; // Ocean фон

  // 3. Фон и рамка итогового блока
  const containerBackgroundClasses =
    "bg-gray-50 border-gray-200 " + // Светлый фон/рамка по умолчанию
    "dark:bg-gray-900 dark:border-gray-800 " + // Темный фон в темном режиме
    "ocean:bg-ocean-background-secondary ocean:border-ocean-border"; // Адаптивный фон для Ocean

  // 4. Заголовок "Итого по упражнению" (полужирный второстепенный текст)
  const headerTextClasses =
    "text-gray-700 " +
    "dark:text-gray-300 " +
    "ocean:text-ocean-secondary-foreground";

  return (
    <View className="mt-3">
      {/* Заголовок */}
      <Text className={`text-sm font-semibold mb-2 ${headerTextClasses}`}>
        Итого по упражнению
      </Text>

      {/* Итоговый блок */}
      <View className={`rounded-xl p-3 border ${containerBackgroundClasses}`}>
        {/* Повторения */}
        <View className="flex-row justify-between mb-1">
          <Text className={`text-sm ${secondaryTextClasses}`}>Повторений</Text>
          <Text className={`text-sm font-medium ${primaryTextClasses}`}>
            {totalReps}
          </Text>
        </View>

        {/* Тоннаж */}
        <View className="flex-row justify-between">
          <Text className={`text-sm ${secondaryTextClasses}`}>Тоннаж</Text>
          <Text className={`text-sm font-medium ${primaryTextClasses}`}>
            {totalWeight.toFixed(1)} кг
          </Text>
        </View>
      </View>
    </View>
  );
}
