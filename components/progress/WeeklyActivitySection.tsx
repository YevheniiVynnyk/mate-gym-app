import { Text, View } from "react-native";
import { Calendar } from "lucide-react-native";
import React from "react";
import { cn } from "@/components/ui/Card";

export default function WeeklyActivitySection({
  weeklyStats,
  completedDays,
  totalDays,
  weekProgress,
}: any) {
  return (
    <View
      className="bg-card dark:bg-gray-800 ocean:bg-ocean-card 
                 p-4 rounded-xl mb-4 border border-border dark:border-gray-700"
    >
      <View className="flex-row items-center mb-3">
        <Calendar
          size={20}
          className="text-primary dark:text-green-500 ocean:text-ocean-primary"
        />
        <Text className="ml-2 text-lg text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Weekly Activity
        </Text>
      </View>

      {weeklyStats && weeklyStats.length > 0 ? (
        <>
          {/* Кружки активности */}
          <View className="flex-row justify-between mb-3">
            {weeklyStats.map((stat: any) => {
              let circleClasses = "bg-muted dark:bg-gray-600 ocean:bg-ocean-muted";
              let icon = "○";
              let textColor = "text-muted-foreground dark:text-gray-400";

              if (stat.status === "COMPLETED") {
                circleClasses = "bg-green-500 dark:bg-green-600";
                icon = "✓";
                textColor = "text-white";
              } else if (stat.status === "PLANNED") {
                circleClasses = "bg-blue-500 dark:bg-blue-600";
                icon = "•"; // Или другая иконка для запланированного
                textColor = "text-white";
              }

              return (
                <View key={stat.day} className="items-center">
                  <Text className="text-xs text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70 mb-1">
                    {stat.day}
                  </Text>
                  <View
                    className={cn(
                      "w-8 h-8 rounded-full items-center justify-center",
                      circleClasses
                    )}
                  >
                    <Text className={cn("font-bold", textColor)}>
                      {icon}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Прогресс-бар */}
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
                Weekly Goal
              </Text>
              <Text className="text-sm text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
                {completedDays}/{totalDays} days
              </Text>
            </View>

            <View
              className="h-2 rounded-full overflow-hidden 
                         bg-muted dark:bg-gray-600 ocean:bg-ocean-muted"
            >
              <View
                className="h-2 bg-primary dark:bg-green-500 ocean:bg-ocean-primary rounded-full"
                style={{ width: `${weekProgress}%` }}
              />
            </View>
          </View>
        </>
      ) : (
        <Text className="text-center text-muted-foreground dark:text-gray-400">
          No data for this week
        </Text>
      )}
    </View>
  );
}
