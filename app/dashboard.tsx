import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingPage } from "@/components/ui/LoadingPage";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { TodayWorkoutCard } from "@/components/dashboard/TodayWorkoutCard";
import WeeklyActivitySection from "@/components/progress/WeeklyActivitySection";
import dayjs from "dayjs";
import { BMIChart } from "@/components/body/BMIChart";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { GuestWarningBanner } from "@/components/dashboard/GuestWarningBanner";
import { OnboardingBanner } from "@/components/dashboard/OnboardingBanner";

export default function Dashboard() {
  const { trainingDays, quickStats, bmiData, loading } = useDashboardData();
  const [showOnboardingWizard, setShowOnboardingWizard] = useState(false);

  const todayWorkout = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    return trainingDays.find(
      (td) => dayjs(td.date).format("YYYY-MM-DD") === today,
    );
  }, [trainingDays]);

  const weeklyData = useMemo(() => {
    const today = dayjs();
    const dayOfWeek = today.day();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = today.add(diffToMonday, "day");

    const stats = Array.from({ length: 7 }).map((_, i) => {
      const date = monday.add(i, "day");
      const dateStr = date.format("YYYY-MM-DD");
      const workout = trainingDays.find(
        (td) => dayjs(td.date).format("YYYY-MM-DD") === dateStr,
      );
      return {
        day: date.format("dd"),
        status: workout?.status || null,
      };
    });

    const completedDays = stats.filter((s) => s.status === "COMPLETED").length;
    const totalDays = 3;
    const weekProgress = Math.min((completedDays / totalDays) * 100, 100);

    return { stats, completedDays, totalDays, weekProgress };
  }, [trainingDays]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <OnboardingWizard
        visible={showOnboardingWizard}
        onClose={() => setShowOnboardingWizard(false)}
      />

      <ScrollView
        className="flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4 pb-32">
          <GuestWarningBanner />
          <OnboardingBanner onPress={() => setShowOnboardingWizard(true)} />
          <DashboardStats quickStats={quickStats} />
          <TodayWorkoutCard workout={todayWorkout} />
          <WeeklyActivitySection
            weeklyStats={weeklyData.stats}
            completedDays={weeklyData.completedDays}
            totalDays={weeklyData.totalDays}
            weekProgress={weeklyData.weekProgress}
          />
          <BMIChart
            data={bmiData}
            title="BMI Trend"
            height={180}
            showDots={false}
          />
        </View>
      </ScrollView>
    </>
  );
}
