import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  Calendar,
  Plus,
  Target,
  TrendingUp,
  UserRoundPen,
} from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActionCard } from "@/components/dashboard/ActionCard";
import TrainingCard from "@/components/trainingDay/TrainingCard";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const router = useNavigation();
  const { user } = useAuth();
  const { trainingDays, quickStats, loading } = useDashboardData();
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">{t("loadingText")}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Приветствие */}
      <View className="bg-white p-4 rounded-xl mb-4">
        <Text className="text-xl font-bold">
          {t("Dashboard.welcomeText")}
          {user?.firstName || "Пользователь"}!
        </Text>
        <Text className="text-gray-600 mt-1">
          {t("Dashboard.welcomeMessage")}
        </Text>
      </View>

      {/* Статистика */}
      {quickStats && (
        <View className="my-4 p-2">
          <Text className="text-lg font-bold mb-2">
            📊 {t("Dashboard.statisticBlock.statisticTitle")}
          </Text>
          <View className="flex-row justify-between">
            <StatCard
              title={t("Dashboard.statisticBlock.subTitle1")}
              value={quickStats.totalTrainings.toString()}
            />
            <StatCard
              title={t("Dashboard.statisticBlock.subTitle2")}
              value={quickStats.completedTrainings.toString()}
              subtitle={
                `${
                  quickStats.totalTrainings
                    ? (
                        (quickStats.completedTrainings /
                          quickStats.totalTrainings) *
                        100
                      ).toFixed(0)
                    : 0
                }` + t("Dashboard.statisticBlock.subTitle2Caption")
              }
            />
            <StatCard
              title={t("Dashboard.statisticBlock.subTitle3")}
              value={quickStats.totalTimeMinutes.toString()}
              subtitle={
                quickStats.averageDurationMinutes +
                t("Dashboard.statisticBlock.subTitle2Caption")
              }
            />
          </View>
        </View>
      )}

      {/* Быстрые действия */}
      <View className="my-6 p-2">
        <Text className="text-lg font-bold mb-2">
          ⚡ {t("Dashboard.quickActionsBlock.quickActionsTite")}
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <ActionCard
            icon={<Plus size={24} color="#22c55e" />}
            label={t("Dashboard.quickActionsBlock.actionCardTitle1")}
            onPress={router.toCreateTrainingDay}
          />
          <ActionCard
            icon={<Calendar size={24} color="#22c55e" />}
            label={t("Dashboard.quickActionsBlock.actionCardTitle2")}
            onPress={router.toTrainingList}
          />
          <ActionCard
            icon={<TrendingUp size={24} color="#f59e0b" />}
            label={t("Dashboard.quickActionsBlock.actionCardTitle3")}
            onPress={router.toProgress}
          />
          <ActionCard
            icon={<UserRoundPen size={24} color="#f59e0b" />}
            label={t("Dashboard.quickActionsBlock.actionCardTitle4")}
            onPress={router.toProfile}
          />
        </View>
      </View>

      {/* Последние тренировки */}
      <View className="my-6 p-2">
        <Text className="text-lg font-bold mb-2">
          📅 {t("Dashboard.lastTrainingsBlock.lastTrainingsBlockTtle")}
        </Text>

        {trainingDays.length === 0 ? (
          <View className="items-center p-6">
            <Target size={48} color="#ccc" />
            <Text className="text-gray-500 my-2">
              {t("Dashboard.lastTrainingsBlock.captionZeroTraining")}
            </Text>
            <TouchableOpacity
              className="flex-row items-center bg-green-500 px-4 py-2 rounded-lg"
              onPress={router.toCreateTrainingDay}
            >
              <Plus size={16} color="#fff" />
              <Text className="text-white ml-2">
                {t("Dashboard.lastTrainingsBlock.captionCrreateTraining")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          trainingDays.map((td) => (
            <TrainingCard key={td.id} trainingDay={td} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
