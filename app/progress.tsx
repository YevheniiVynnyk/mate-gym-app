import React from "react";
import { /*ActivityIndicator, */ ScrollView, Text, View } from "react-native";
import { TrendingUp } from "lucide-react-native";
import { useProgress } from "@/hooks/useProgress";
import WeeklyActivitySection from "@/components/progress/WeeklyActivitySection";
import QuickStatsSection from "@/components/progress/QuickStatsSection";
import TrainingTimeSection from "@/components/progress/TrainingTimeSection";
import EmptyState from "@/components/progress/EmptyState";
import { LoadingPageUI } from "@/components/ui/LoadingPageUI";

export default function Progress() {
  const {
    quickStats,
    weeklyStats,
    noData,
    loading,
    completedDays,
    totalDays,
    weekProgress,
  } = useProgress();

  if (loading) {
    return <LoadingPageUI />;
  }

  if (noData) return <EmptyState />;

  return (
    // ✅ Адаптивный фон для всех тем
    <ScrollView
      className="flex-1 p-4 bg-gray-50 
                 dark:bg-gray-900 
                 ocean:bg-ocean-background"
    >
      <View className="flex-row items-center gap-2 mb-4">
        {/* ✅ Адаптивный цвет для иконки (Primary) */}
        <TrendingUp
          size={28}
          className="text-primary dark:text-green-500 ocean:text-ocean-primary"
        />
        {/* ✅ Адаптивный цвет для заголовка (Foreground) */}
        <Text className="text-2xl text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Мой прогресс
        </Text>
      </View>

      <WeeklyActivitySection
        weeklyStats={weeklyStats}
        completedDays={completedDays}
        totalDays={totalDays}
        weekProgress={weekProgress}
      />

      <QuickStatsSection quickStats={quickStats} />
      <TrainingTimeSection />
    </ScrollView>
  );
}
