import React from "react";
import { Text, View } from "react-native";
import { StatCard } from "@/components/dashboard/StatCard";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";

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

  const completionPercent = quickStats?.totalTrainings
    ? (
        (quickStats?.completedTrainings / quickStats?.totalTrainings) *
        100
      ).toFixed(0)
    : "0";

  return (
    <Card className="bg-card p-4 rounded-xl border border-border">
      <Text className="text-base font-bold mb-3 text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
        {t("dashboardStats.title")}
      </Text>

      <View className="flex-row justify-between">
        <StatCard
          title={t("dashboardStats.total")}
          value={quickStats ? quickStats.totalTrainings.toString() : "0"}
        />

        <StatCard
          title={t("dashboardStats.completed")}
          value={quickStats ? quickStats?.completedTrainings.toString() : "0"}
          subtitle={`${completionPercent}%`}
        />

        <StatCard
          title={t("dashboardStats.time")}
          value={quickStats ? quickStats?.totalTimeMinutes.toString() : "0"}
          subtitle={`${t("dashboardStats.avg")} ${quickStats?.averageDurationMinutes}${t("units.m")}`}
        />
      </View>
    </Card>
  );
}
