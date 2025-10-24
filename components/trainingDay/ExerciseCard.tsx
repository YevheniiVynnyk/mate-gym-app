import React from "react";
import { Text, View } from "react-native";
import ExerciseTotal from "@/components/trainingDay/ExerciseTotal";

export default function ExerciseCard({
  training,
  index,
}: {
  training: any;
  index: number;
}) {
  // Адаптивные классы для ОСНОВНОГО текста (заголовки, цифры).
  // Светлая: text-gray-900 | Темная: text-white | Ocean: text-ocean-foreground (синий)
  const primaryTextClasses =
    "text-gray-900 " + "dark:text-white " + "ocean:text-ocean-foreground";

  // Адаптивные классы для текста подзаголовка и второстепенных деталей (количество подходов)
  const subtitleClasses =
    "text-gray-600 " +
    "dark:text-gray-400 " +
    "ocean:text-ocean-secondary-foreground";

  // Адаптивные классы для фона строки подхода и рамки
  const setBackgroundClasses =
    "bg-gray-100 border-gray-100 " + // Светлый фон/рамка по умолчанию
    "dark:bg-gray-800 dark:border-gray-700 " + // Темный фон в темном режиме
    "ocean:bg-ocean-background-secondary ocean:border-ocean-border ";

  // Адаптивные классы для фона блока заметок
  const noteBackgroundClasses =
    "bg-gray-200 " + // Светлый фон по умолчанию
    "dark:bg-gray-700 " + // Темный фон в темном режиме
    "ocean:bg-ocean-accent/30"; // Легкий акцентный фон для Ocean

  // Адаптивные классы для текста "x" (множитель)
  const multiplierTextClasses =
    "text-gray-500 " +
    "dark:text-gray-400 " +
    "ocean:text-ocean-secondary-foreground";

  return (
    <View className="p-1 rounded-lg mb-2">
      {/* Заголовок */}
      <Text className={`text-md font-bold ${primaryTextClasses}`}>
        {index + 1}. {training.exercise.name}
      </Text>

      {/* Количество подходов */}
      <Text className={`text-sm text-right ${subtitleClasses}`}>
        {training.trainingDetails.length} подходов
      </Text>

      {/* Список подходов */}
      {training.trainingDetails.map((set: any, i: number) => (
        <View
          key={i}
          // Применяем адаптивные классы фона и рамки
          className={`flex-row justify-between m-1 p-1 px-2 border rounded-lg ${setBackgroundClasses}`}
        >
          {/* Основной текст в строке подхода */}
          <Text className={`font-medium ${primaryTextClasses}`}>
            Подход {i + 1}
          </Text>
          <View className="flex-row items-center space-x-1">
            {/* Основной текст (повторения) */}
            <Text className={primaryTextClasses}>{set.repetition}</Text>
            {set.weight > 0 && (
              <>
                {/* Второстепенный текст (множитель) */}
                <Text className={multiplierTextClasses}> × </Text>
                {/* Основной текст (вес) */}
                <Text className={primaryTextClasses}>{set.weight} кг</Text>
              </>
            )}
          </View>
        </View>
      ))}

      {/* Блок заметок */}
      {training.note && (
        <View className={`p-2 rounded-lg mt-2 ${noteBackgroundClasses}`}>
          {/* Основной текст (заголовок заметки) */}
          <Text className={`font-bold mb-1 ${primaryTextClasses}`}>
            Заметки:
          </Text>
          {/* Основной текст (содержание заметки) */}
          <Text className={primaryTextClasses}>{training.note}</Text>
        </View>
      )}

      <ExerciseTotal training={training} />
    </View>
  );
}
