import React from "react";
import { ScrollView, View } from "react-native";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingPage } from "@/components/ui/LoadingPage";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import DashboardLastTrainings from "@/components/dashboard/DashboardLastTrainings";

export default function Dashboard() {
  const { trainingDays, quickStats, loading } = useDashboardData();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ScrollView
      className="flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        <DashboardHeader />
        <DashboardStats quickStats={quickStats} />
        <DashboardQuickActions />
        <DashboardLastTrainings trainingDays={trainingDays} />
      </View>
    </ScrollView>
  );
}
