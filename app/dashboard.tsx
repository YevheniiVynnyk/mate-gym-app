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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { LoadingPage } from "@/components/ui/LoadingPage";
import Banner from "@/components/ads/Banner";
import { BannerAdSize } from "react-native-google-mobile-ads";

export default function Dashboard() {
  const { t } = useTranslation();
  const router = useNavigation();
  const { user } = useAuth();
  const { trainingDays, quickStats, loading } = useDashboardData();
  const { theme } = useTheme();

  // ✅ Адаптивные классы для заголовков разделов (text-foreground адаптивен)
  const sectionTitleClasses =
    "text-lg mb-2 text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  // ✅ Адаптивные классы для текста при отсутствии тренировок
  const emptyTrainingTextClasses =
    "text-gray-500 my-2 dark:text-gray-400 ocean:text-ocean-foreground/70";
  const plusButtonTextClasses = "text-white ml-2 dark:text-gray-900";

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ScrollView
      className="flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background"
      showsVerticalScrollIndicator={false}
    >
      <Banner size={BannerAdSize.BANNER} />
      <View className="p-4">
        {/* Приветствие */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {t("Dashboard.welcomeText")}
              {user?.firstName || "Пользователь"}!
            </CardTitle>
            <CardDescription className="mt-1">
              {t("Dashboard.welcomeMessage")}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Статистика */}
        {quickStats && (
          <View>
            {/* ✅ Заголовок раздела с адаптивным текстом */}
            <View className="my-4 p-2">
              <Text className={sectionTitleClasses}>
                📊 {t("Dashboard.statisticBlock.statisticTitle")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              {/* StatCard должен использовать CardUI внутри себя */}
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
        <View>
          {/* ✅ Заголовок раздела с адаптивным текстом */}
          <View className="my-4 p-2">
            <Text className={sectionTitleClasses}>
              ⚡ {t("Dashboard.quickActionsBlock.quickActionsTite")}
            </Text>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {/* ActionCard должен использовать CardUI внутри себя */}
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
        <View className="pb-8">
          {/* ✅ Заголовок раздела с адаптивным текстом */}
          <View className="my-4 p-2">
            <Text className={sectionTitleClasses}>
              📅 {t("Dashboard.lastTrainingsBlock.lastTrainingsBlockTtle")}
            </Text>
          </View>

          {trainingDays.length === 0 ? (
            // ✅ Используем CardUI для оформления блока "Нет тренировок"
            <Card className="items-center p-6">
              {/* Иконка адаптируется под тему (темнее в dark) */}
              <Target size={48} color={theme === "dark" ? "#555" : "#ccc"} />
              <Text className={emptyTrainingTextClasses}>
                {t("Dashboard.lastTrainingsBlock.captionZeroTraining")}
              </Text>
              <TouchableOpacity
                className="flex-row items-center bg-green-500 px-4 py-2 rounded-lg mt-4"
                onPress={router.toCreateTrainingDay}
              >
                <Plus size={16} color="#fff" />
                <Text className={plusButtonTextClasses}>
                  {t("Dashboard.lastTrainingsBlock.captionCrreateTraining")}
                </Text>
              </TouchableOpacity>
            </Card>
          ) : (
            // TrainingCard должен использовать CardUI внутри себя
            trainingDays.map((td) => (
              <TrainingCard key={td.id} trainingDay={td} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
