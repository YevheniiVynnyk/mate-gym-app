import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useProgress } from "@/hooks/useProgress";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { useInterstitialAd } from "@/hooks/useInterstitialAd";

// Новые компоненты
import { WeightChart } from "@/components/progress/charts/WeightChart";
import { PersonalRecords } from "@/components/progress/PersonalRecords";
import { ActivityHeatmap } from "@/components/progress/charts/ActivityHeatmap";

export default function Progress() {
  const { data, loading, refresh } = useProgress();
  const { showAd, loaded } = useInterstitialAd();
  const [hasShownAd, setHasShownAd] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (loaded && !hasShownAd) {
      showAd();
      setHasShownAd(true);
    }
  }, [loaded, hasShownAd]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <WeightChart data={data.weightHistory} onRefresh={refresh} />

        <PersonalRecords records={data.personalRecords} />

        <ActivityHeatmap data={data.activityHeatmap} />
      </ScrollView>
    </View>
  );
}
