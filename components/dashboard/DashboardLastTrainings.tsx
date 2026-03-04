import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Plus, Target } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/Card";
import TrainingCard from "@/components/trainingDay/TrainingCard";

interface Props {
  trainingDays: any[];
}

export default function DashboardLastTrainings({ trainingDays }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useNavigation();

  const sectionTitle =
    "text-lg mb-2 text-foreground dark:text-gray-100 ocean:text-ocean-foreground";

  const emptyText =
    "text-gray-500 my-2 dark:text-gray-400 ocean:text-ocean-foreground/70";

  return (
    <View className="pb-8">
      <View className="my-4 p-2">
        <Text className={sectionTitle}>
          📅 {t("Dashboard.lastTrainingsBlock.lastTrainingsBlockTtle")}
        </Text>
      </View>

      {trainingDays.length === 0 ? (
        <Card className="items-center p-6">
          <Target size={48} color={theme === "dark" ? "#555" : "#ccc"} />

          <Text className={emptyText}>
            {t("Dashboard.lastTrainingsBlock.captionZeroTraining")}
          </Text>

          <TouchableOpacity
            className="flex-row items-center bg-green-500 px-4 py-2 rounded-lg mt-4"
            onPress={router.toCreateTrainingDay}
          >
            <Plus size={16} color="#fff" />
            <Text className="text-white ml-2">
              {t("Dashboard.lastTrainingsBlock.captionCrreateTraining")}
            </Text>
          </TouchableOpacity>
        </Card>
      ) : (
        trainingDays.map((td) => <TrainingCard key={td.id} trainingDay={td} />)
      )}
    </View>
  );
}
