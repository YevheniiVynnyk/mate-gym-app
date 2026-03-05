import React from "react";
import { Text, View } from "react-native";
import { Card, cn } from "@/components/ui/Card";
import dayjs from "dayjs";

interface Props {
  completedDates: string[]; // Массив дат завершенных тренировок (YYYY-MM-DD)
}

export const WeeklyActivity: React.FC<Props> = ({ completedDates }) => {
  // Генерируем последние 7 дней
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = dayjs().subtract(6 - i, "day");
    return {
      date: date.format("YYYY-MM-DD"),
      dayName: date.format("dd"), // Mo, Tu, We...
      isToday: date.isSame(dayjs(), "day"),
    };
  });

  return (
    <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm">
      <Text className="text-base font-bold mb-3 text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
        Weekly Activity
      </Text>
      
      <View className="flex-row justify-between">
        {days.map((day) => {
          const isCompleted = completedDates.includes(day.date);
          
          return (
            <View key={day.date} className="items-center">
              {/* Столбик/Индикатор */}
              <View
                className={cn(
                  "w-8 h-10 rounded-lg mb-2 items-center justify-center",
                  isCompleted 
                    ? "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary" 
                    : "bg-secondary/50 dark:bg-gray-700 ocean:bg-ocean-primary/10",
                  day.isToday && !isCompleted && "border-2 border-primary/50"
                )}
              >
                {isCompleted && (
                  <View className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </View>
              
              {/* День недели */}
              <Text 
                className={cn(
                  "text-xs",
                  day.isToday 
                    ? "font-bold text-primary dark:text-primary-400" 
                    : "text-muted-foreground dark:text-gray-500"
                )}
              >
                {day.dayName.charAt(0)}
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
};
