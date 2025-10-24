import React from "react";
import { Text, View } from "react-native";

/**
 * Вспомогательная функция для расчета итогов тренировочного дня.
 * @param trainingDay Объект тренировочного дня.
 * @returns {totalReps, totalWeight}
 */
const calcTotals = (trainingDay: any) => {
  let totalReps = 0;
  let totalWeight = 0;
  // Убеждаемся, что trainingDay.trainings существует и является массивом
  if (trainingDay.trainings && Array.isArray(trainingDay.trainings)) {
    trainingDay.trainings.forEach((t: any) => {
      // Убеждаемся, что trainingDetails существует
      if (t.trainingDetails && Array.isArray(t.trainingDetails)) {
        t.trainingDetails.forEach((set: any) => {
          // Проверяем, что repetition и weight являются числами
          const reps = typeof set.repetition === "number" ? set.repetition : 0;
          const weight = typeof set.weight === "number" ? set.weight : 0;

          totalReps += reps;
          totalWeight += reps * weight;
        });
      }
    });
  }
  return { totalReps, totalWeight };
};

/**
 * Вложенный компонент плитки статистики
 */
const StatTile = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  // Адаптивные классы для фона плитки
  const tileBgClasses = "bg-muted dark:bg-gray-700 ocean:bg-ocean-muted";

  // Адаптивные классы для текста метки (приглушенный цвет)
  const labelTextClasses =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70";

  // Адаптивные классы для значения (основной цвет)
  const valueTextClasses =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";

  return (
    <View
      // Применяем адаптивные классы фона
      className={`flex-1 mx-1 p-3 rounded-xl items-center justify-center ${tileBgClasses} `}
    >
      <Text className={`text-sm ${labelTextClasses}`}>{label}</Text>
      <Text className={`text-lg ${valueTextClasses}`}>{value}</Text>
    </View>
  );
};

export default function TrainingStats({ trainingDay }: { trainingDay: any }) {
  const totals = calcTotals(trainingDay);

  // Адаптивные классы для фона основного контейнера (Card)
  const mainCardClasses =
    "bg-card rounded-xl p-4 mb-4  " +
    "dark:bg-gray-800 " +
    "ocean:bg-ocean-card";

  // Адаптивные классы для заголовка
  const headerTextClasses =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";

  return (
    <View className={mainCardClasses}>
      <Text className={`text-lg mb-3 ${headerTextClasses}`}>
        Итоги тренировки
      </Text>

      <View className="flex-row justify-between">
        <StatTile label="Повторения" value={totals.totalReps} />
        <StatTile
          label="Тоннаж"
          value={`${totals.totalWeight.toFixed(0)} кг`}
        />
        {/* Проверяем наличие trainings перед использованием .length */}
        <StatTile
          label="Упражнений"
          value={trainingDay.trainings?.length ?? 0}
        />
      </View>
    </View>
  );
}
