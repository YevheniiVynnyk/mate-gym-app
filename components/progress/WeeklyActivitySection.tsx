import { Text, View } from "react-native";
import { Calendar } from "lucide-react-native";
import React from "react";

export default function WeeklyActivitySection({
  weeklyStats,
  completedDays,
  totalDays,
  weekProgress,
}: any) {
  return (
    // ✅ Адаптивный фон: bg-card, скругление и тень
    <View
      className="bg-card dark:bg-gray-800 ocean:bg-ocean-card 
                 p-4 rounded-xl mb-4 border border-border dark:border-gray-700"
    >
      <View className="flex-row items-center mb-3">
        {/* ✅ Адаптивный цвет для иконки (Primary) */}
        <Calendar
          size={20}
          className="text-primary dark:text-green-500 ocean:text-ocean-primary"
        />
        {/* ✅ Адаптивный цвет для заголовка (Foreground) */}
        <Text className="ml-2 text-lg text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Активность на этой неделе
        </Text>
      </View>

      {weeklyStats && weeklyStats.length > 0 ? (
        <>
          {/* Кружки активности */}
          <View className="flex-row justify-between mb-3">
            {weeklyStats.map((stat: any) => {
              // Классы для кружка
              const circleClasses = stat.completed
                ? "bg-primary dark:bg-green-500 ocean:bg-ocean-primary" // Завершено: Primary
                : "bg-muted dark:bg-gray-600 ocean:bg-ocean-muted"; // Не завершено: Muted/Secondary

              return (
                <View key={stat.day} className="items-center">
                  {/* ✅ Адаптивный текст дня недели (muted-foreground) */}
                  <Text className="text-xs text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70">
                    {stat.day}
                  </Text>
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center mt-1 ${circleClasses}`}
                  >
                    {/* Текст внутри кружка всегда светлый */}
                    <Text className="text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground">
                      {stat.completed ? "✓" : "○"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Прогресс-бар */}
          <View>
            <View className="flex-row justify-between">
              {/* ✅ Адаптивный текст */}
              <Text className="text-sm text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
                Прогресс недели
              </Text>
              {/* ✅ Адаптивный текст */}
              <Text className="text-sm text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
                {completedDays}/{totalDays} дней
              </Text>
            </View>

            {/* Фон прогресс-бара */}
            <View
              className="h-2 rounded-full mt-1 overflow-hidden 
                         bg-muted dark:bg-gray-600 ocean:bg-ocean-muted"
            >
              {/* Заполненная часть прогресс-бара (Primary) */}
              <View
                className="h-2 bg-primary dark:bg-green-500 ocean:bg-ocean-primary rounded-full"
                style={{ width: `${weekProgress}%` }}
              />
            </View>
          </View>
        </>
      ) : (
        // ✅ Адаптивный текст
        <Text className="text-center text-muted-foreground dark:text-gray-400">
          Нет данных за эту неделю
        </Text>
      )}
    </View>
  );
}
