import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TrendingUp } from "lucide-react-native";
import { useProgress } from "@/hooks/useProgress";
import WeeklyActivitySection from "@/components/progress/WeeklyActivitySection";
import QuickStatsSection from "@/components/progress/QuickStatsSection";
import TrainingTimeSection from "@/components/progress/TrainingTimeSection";
import EmptyState from "@/components/progress/EmptyState";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { useInterstitialAd } from "@/hooks/useInterstitialAd";

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

  const { showAd, loaded } = useInterstitialAd();
  const [hasShownAd, setHasShownAd] = useState(false);

  useEffect(() => {
    // Показываем рекламу только если она загружена и мы ее еще не показывали
    if (loaded && !hasShownAd) {
      showAd();
      setHasShownAd(true);
    }
  }, [loaded, hasShownAd]);

  if (loading) {
    return <LoadingPage />;
  }

  if (noData) return <EmptyState />;

  return (
    <ScrollView
      className="flex-1 p-4 bg-gray-50 
                 dark:bg-gray-900 
                 ocean:bg-ocean-background"
    >
      <View className="flex-row items-center gap-2 mb-4">
        <TrendingUp
          size={28}
          className="text-primary dark:text-green-500 ocean:text-ocean-primary"
        />
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
