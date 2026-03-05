import React, { memo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar, Clock, Dumbbell } from "lucide-react-native";
import { useRouter } from "expo-router";
import { TrainingDay } from "@/types/trainingDay";
import { Card, cn } from "@/components/ui/Card";
import { useTranslation } from "react-i18next";

type TrainingCardProps = {
  trainingDay: TrainingDay;
};

const TrainingCard: React.FC<TrainingCardProps> = memo(({ trainingDay }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = useCallback(() => {
    router.push(`/trainingDay/${trainingDay.id}`);
  }, [router, trainingDay.id]);

  const isCompleted = trainingDay.status === "COMPLETED";

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}${t("units.h")} ${m}${t("units.m")}` : `${m}${t("units.m")}`;
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  return (
    <Pressable onPress={handlePress} className="mb-4 active:opacity-90">
      <Card className="rounded-2xl p-0 overflow-hidden border-0 shadow-sm bg-card dark:bg-gray-800 ocean:bg-ocean-card">
        {/* Status Strip */}
        <View
          className={cn(
            "h-1 w-full",
            isCompleted ? "bg-green-500" : "bg-yellow-400",
          )}
        />

        <View className="p-4">
          {/* Header */}
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1 mr-2">
              <Text
                className="text-lg font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground"
                numberOfLines={1}
              >
                {trainingDay.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Calendar size={12} className="text-muted-foreground mr-1" />
                <Text className="text-xs text-muted-foreground dark:text-gray-400">
                  {formatDate(trainingDay.date)}
                </Text>
              </View>
            </View>

            <View
              className={cn(
                "px-2 py-1 rounded-md",
                isCompleted
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-yellow-100 dark:bg-yellow-900/30",
              )}
            >
              <Text
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  isCompleted
                    ? "text-green-700 dark:text-green-400"
                    : "text-yellow-700 dark:text-yellow-400",
                )}
              >
                {isCompleted ? t("status.done") : t("status.planned")}
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between mb-4 space-x-4">
            <View className="flex-row items-center bg-secondary/50 px-2 py-1 rounded-md">
              <Clock size={14} className="text-primary mr-1.5" />
              <Text className="text-xs font-medium text-foreground dark:text-gray-200">
                {formatDuration(trainingDay.durationMinutes)}
              </Text>
            </View>
            <View className="flex-row items-center bg-secondary/50 px-2 py-1 rounded-md">
              <Dumbbell size={14} className="text-blue-500 mr-1.5" />
              <Text className="text-xs font-medium text-foreground dark:text-gray-200">
                {trainingDay.trainings.length} {t("trainingCard.exercises")}
              </Text>
            </View>
          </View>

          {/* Exercises List */}
          {trainingDay.trainings.length > 0 && (
            <View className="bg-secondary/30 rounded-xl p-2">
              {trainingDay.trainings.map((training, i) => (
                <View key={training.id} className="mb-2 last:mb-0">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1 mr-2">
                      <View className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                      <Text
                        className="text-md font-medium text-foreground/90 dark:text-gray-200"
                        numberOfLines={1}
                      >
                        {training.exercise.name}
                      </Text>
                    </View>
                    <Text className="text-md text-muted-foreground font-medium">
                      {training.trainingDetails.length} {t("trainingCard.sets")}
                    </Text>
                  </View>

                  {/* Sets details */}
                  <View className="flex-row flex-wrap ml-3.5 mt-0.5">
                    {training.trainingDetails.map((d, j) => (
                      <View
                        key={j}
                        className="mr-2 mb-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-md"
                      >
                        <Text className="text-sm text-gray-700 dark:text-gray-300">
                          {d.repetition} x {d.weight}{t("units.kg")}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
});

TrainingCard.displayName = "TrainingCard";

export default TrainingCard;
