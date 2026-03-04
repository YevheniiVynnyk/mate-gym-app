import React from "react";
import { Text, View } from "react-native";
import { StatCard } from "@/components/dashboard/StatCard";
import { useTranslation } from "react-i18next";

interface Props {
  quickStats?: {
    totalTrainings: number;
    completedTrainings: number;
    totalTimeMinutes: number;
    averageDurationMinutes: number;
  };
}

export default function DashboardStats({ quickStats }: Props) {
  const { t } = useTranslation();

  const sectionTitle =
    "text-lg mb-2 text-foreground dark:text-gray-100 ocean:text-ocean-foreground";

  const completionPercent = quickStats?.totalTrainings
    ? (
        (quickStats?.completedTrainings / quickStats?.totalTrainings) *
        100
      ).toFixed(0)
    : "0";

  return (
    <View>
      <View className="my-4 p-2">
        <Text className={sectionTitle}>
          📊 {t("Dashboard.statisticBlock.statisticTitle")}
        </Text>
      </View>

      <View className="flex-row justify-between">
        <StatCard
          title={t("Dashboard.statisticBlock.subTitle1")}
          value={quickStats ? quickStats.totalTrainings.toString() : "0"}
        />

        <StatCard
          title={t("Dashboard.statisticBlock.subTitle2")}
          value={quickStats ? quickStats?.completedTrainings.toString() : "0"}
          subtitle={`${completionPercent}${t(
            "Dashboard.statisticBlock.subTitle2Caption",
          )}`}
        />

        <StatCard
          title={t("Dashboard.statisticBlock.subTitle3")}
          value={quickStats ? quickStats?.totalTimeMinutes.toString() : "0"}
          subtitle={`${quickStats?.averageDurationMinutes}${t(
            "Dashboard.statisticBlock.subTitle2Caption",
          )}`}
        />
      </View>
    </View>
  );
}
