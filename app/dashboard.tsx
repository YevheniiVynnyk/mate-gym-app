import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingPage } from "@/components/ui/LoadingPage";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { TodayWorkoutCard } from "@/components/dashboard/TodayWorkoutCard";
import WeeklyActivitySection from "@/components/progress/WeeklyActivitySection";
import dayjs from "dayjs";
import { BMIChart } from "@/components/body/BMIChart";

export default function Dashboard() {
  const { trainingDays, quickStats, bmiData, loading } = useDashboardData();

  // Находим тренировку на сегодня
  const todayWorkout = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    return trainingDays.find(
      (td) => dayjs(td.date).format("YYYY-MM-DD") === today,
    );
  }, [trainingDays]);

  // Подготовка данных для WeeklyActivitySection
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

      let status = null;
      if (workout) {
        status = workout.status;
      }

      return {
        day: date.format("dd"),
        status: status,
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
    <ScrollView
      className="flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        <DashboardHeader />

        <TodayWorkoutCard workout={todayWorkout} />

        <BMIChart
          data={bmiData}
          title="BMI Trend"
          height={180}
          showDots={false}
        />

        <WeeklyActivitySection
          weeklyStats={weeklyData.stats}
          completedDays={weeklyData.completedDays}
          totalDays={weeklyData.totalDays}
          weekProgress={weeklyData.weekProgress}
        />

        <DashboardStats quickStats={quickStats} />
      </View>
    </ScrollView>
  );
}
