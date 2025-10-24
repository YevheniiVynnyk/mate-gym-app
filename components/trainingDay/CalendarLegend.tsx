import React from "react";
import { Text, View } from "react-native";
import { cn } from "@/components/ui/CardUI"; // Используем cn для условного объединения классов

// Определяем адаптивные стили для легенды, основываясь на логике CalendarUI
const statuses = [
  // isToday: Обводка цветом Primary (Соответствует border-2 border-primary)
  {
    label: "Сегодня",
    isBorder: true,
    classes: "border-primary dark:border-green-500 ocean:border-ocean-primary",
  },
  // isSelected: Заливка цветом Primary + обводка (Соответствует bg-primary border-primary)
  {
    label: "Обрана дата",
    isBorder: true, // Используем border-2 для выделения
    classes:
      "bg-primary border-primary dark:bg-primary-600 dark:border-primary-600 ocean:bg-ocean-primary ocean:border-ocean-primary",
  },
  // IN_PROGRESS: Заливка синим с прозрачностью (Соответствует bg-blue-500/20)
  {
    label: "Запланировано",
    isBorder: false,
    classes: "bg-blue-500/30 dark:bg-blue-500/40 ocean:bg-blue-600/30",
  },
  // COMPLETED: Заливка зеленым с прозрачностью (Соответствует bg-green-500/20)
  {
    label: "Завершено",
    isBorder: false,
    classes: "bg-green-500/30 dark:bg-green-500/40 ocean:bg-green-600/30",
  },
];

export const CalendarLegend = () => (
  <View className="px-6 pb-4 mt-4">
    <View className="flex flex-row flex-wrap gap-4">
      {statuses.map((s) => {
        // Определяем классы для символа легенды
        const legendClasses = cn(
          "w-3 h-3 rounded-full",
          s.classes,
          s.isBorder ? "border-2" : ""
        );

        return (
          <View key={s.label} className="flex flex-row items-center gap-2">
            <View className={legendClasses} />
            {/* Адаптивный цвет текста (foreground) */}
            <Text className="text-sm text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
              {s.label}
            </Text>
          </View>
        );
      })}
    </View>
  </View>
);
