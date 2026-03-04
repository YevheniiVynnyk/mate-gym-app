import React from "react";
import { Text, View } from "react-native";
import { Calendar, Plus, TrendingUp, UserRoundPen } from "lucide-react-native";
import { ActionCard } from "@/components/dashboard/ActionCard";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";

export default function DashboardQuickActions() {
  const { t } = useTranslation();
  const router = useNavigation();

  const sectionTitle =
    "text-lg mb-2 text-foreground dark:text-gray-100 ocean:text-ocean-foreground";

  return (
    <View>
      <View className="my-2 p-2">
        <Text className={sectionTitle}>
          ⚡ {t("Dashboard.quickActionsBlock.quickActionsTite")}
        </Text>
      </View>

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

        {/*<ActionCard*/}
        {/*  icon={<TrendingUp size={24} color="#f59e0b" />}*/}
        {/*  label={t("Dashboard.quickActionsBlock.actionCardTitle3")}*/}
        {/*  onPress={router.toProgress}*/}
        {/*/>*/}

        {/*<ActionCard*/}
        {/*  icon={<UserRoundPen size={24} color="#f59e0b" />}*/}
        {/*  label={t("Dashboard.quickActionsBlock.actionCardTitle4")}*/}
        {/*  onPress={router.toProfile}*/}
        {/*/>*/}
      </View>
    </View>
  );
}
