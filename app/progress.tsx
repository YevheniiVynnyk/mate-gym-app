import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useProgress } from "@/hooks/useProgress";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { useInterstitialAd } from "@/hooks/useInterstitialAd";
import { AddBodyMetricsModal } from "@/components/body/AddBodyMetricsModal";
import { WeightChart } from "@/components/progress/charts/WeightChart";
import { ActivityHeatmap } from "@/components/progress/charts/ActivityHeatmap";
import { MuscleDistributionChart } from "@/components/progress/charts/MuscleDistributionChart";

export default function Progress() {
  const { data, bodyData, loading, refresh } = useProgress();
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
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <WeightChart
          weightData={data.weightHistory}
          bmiData={data.bmiHistory}
          fullHistory={bodyData}
          onRefresh={refresh}
        />

        <MuscleDistributionChart data={data.summary.muscleDistribution} />

        <ActivityHeatmap data={data.summary.activityHeatmap} />
      </ScrollView>

      <AddBodyMetricsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSuccess={refresh}
      />
    </View>
  );
}
