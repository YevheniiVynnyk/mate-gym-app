import { Text, View } from "react-native";
import { formatDuration } from "@/lib/utils"; // Предполагаем, что этот импорт доступен
import React from "react";

export default function QuickStatsSection({ quickStats }: any) {
  // Класс для метки (например, "Всего тренировок")
  const labelClass =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70 text-sm";
  // Класс для значения (например, 15)
  const valueClass =
    "font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground";

  return (
    // ✅ Адаптивный фон: bg-card, скругление и тень
    <View
      className="bg-card dark:bg-gray-800 ocean:bg-ocean-card 
                 p-4 rounded-xl mb-4 border border-border dark:border-gray-700"
    >
      {/* ✅ Адаптивный цвет для заголовка (Foreground) */}
      <Text className={`text-lg font-bold mb-3 ${valueClass}`}>
        Общая статистика
      </Text>

      {quickStats ? (
        <>
          {/* Всего тренировок */}
          <View className="flex-row justify-between mb-2">
            <Text className={labelClass}>Всего тренировок</Text>
            <Text className={valueClass}>{quickStats.totalTrainings}</Text>
          </View>

          {/* Завершено (%) */}
          <View className="flex-row justify-between mb-2">
            <Text className={labelClass}>Завершено</Text>
            <Text className={valueClass}>
              {quickStats.totalTrainings
                ? (
                    (quickStats.completedTrainings /
                      quickStats.totalTrainings) *
                    100
                  ).toFixed(0)
                : 0}
              %
            </Text>
          </View>

          {/* Время тренировок */}
          <View className="flex-row justify-between mb-2">
            <Text className={labelClass}>Время тренировок</Text>
            <Text className={valueClass}>
              {/* Предполагаем, что formatDuration корректно работает */}
              {formatDuration(quickStats.totalTimeMinutes)}
            </Text>
          </View>

          {/* Среднее время */}
          <View className="flex-row justify-between">
            <Text className={labelClass}>Среднее время</Text>
            <Text className={valueClass}>
              {/* Предполагаем, что formatDuration корректно работает */}
              {formatDuration(quickStats.averageDurationMinutes)}
            </Text>
          </View>
        </>
      ) : (
        // ✅ Адаптивный текст для отсутствия данных
        <Text className="text-center text-muted-foreground dark:text-gray-400">
          Нет данных статистики
        </Text>
      )}
    </View>
  );
}
