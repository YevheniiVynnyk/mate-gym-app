import React, { memo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { Clock, Target } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Training, TrainingDay } from "@/types/trainingDay";
import { CardUI, cn } from "@/components/ui/CardUI";

type TrainingCardProps = {
  trainingDay: TrainingDay;
};
const TrainingCard: React.FC<TrainingCardProps> = memo(({ trainingDay }) => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push(`/trainingDay/${trainingDay.id}`);
  }, [router, trainingDay.id]);

  const isCompleted = trainingDay.status === "COMPLETED";

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Не указано";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}ч ${m}м` : `${m}м`;
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Pressable onPress={handlePress} className="mb-3 active:opacity-80">
      <CardUI className="rounded-2xl p-4">
        {/* HEADER */}
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
            {trainingDay.name}
          </Text>

          <View
            className={`px-2 py-1 rounded-full ${
              isCompleted ? "bg-green-500" : "bg-yellow-400"
            }`}
          >
            <Text className="text-xs text-white font-semibold">
              {isCompleted ? "Завершена" : "Запланирована"}
            </Text>
          </View>
        </View>

        {/* DATE */}
        <Text className="text-xs text-muted-foreground mt-1 dark:text-gray-400 ocean:text-ocean-foreground/70">
          {formatDate(trainingDay.date)}
        </Text>

        {/* INFO */}
        <View className="mt-3 space-y-2">
          {/* Первая строка с двумя InfoRow */}
          <View className="flex-row justify-between">
            <InfoRow
              icon={<Clock size={16} color="orange" />}
              text={formatDuration(trainingDay.durationMinutes)}
            />
            <InfoRow
              icon={<Target size={16} color="green" />}
              text={`${trainingDay.trainings.length} упражнений`}
            />
          </View>

          {/* Вторая строка с InfoTraining */}
          <InfoTraining trainings={trainingDay.trainings} />
        </View>
      </CardUI>
    </Pressable>
  );
});

TrainingCard.displayName = "TrainingCard";

export default TrainingCard;

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <View className="m-1">
    <View className="flex-row items-center">
      {icon}
      <Text className="ml-2 text-xs text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
        {text}
      </Text>
    </View>
  </View>
);

const InfoTraining = ({ trainings }: { trainings: Training[] }) => (
  <View className="mt-1 p-1 rounded-lg">
    {trainings.map((t) => (
      <View
        key={t.id}
        className={cn(
          "rounded-lg p-2 m-1 border",
          // Light Theme: Светлый фон, легкая граница
          "bg-gray-100 border-gray-200",
          // Dark Theme: Более темный фон, менее заметная граница
          "dark:bg-gray-800 dark:border-gray-700",
          // Ocean Theme: Вариация цвета CardUI
          "ocean:bg-ocean-card/50 ocean:border-ocean-border"
        )}
      >
        {/* Название упражнения */}
        <Text className="text-sm font-semibold text-foreground mb-1 dark:text-gray-100 ocean:text-ocean-foreground">
          {t.exercise.name}
        </Text>

        {/* Подходы как плитки */}
        <View className="flex-row flex-wrap">
          {t.trainingDetails.map((d, i) => (
            <View
              key={i}
              className={cn(
                "rounded-md p-1 mr-1 mt-1",
                "bg-gray-200", // Light
                "dark:bg-gray-700", // Dark
                "ocean:bg-ocean-primary/20" // Ocean (используем акцентный цвет с прозрачностью)
              )}
            >
              <Text className="text-xs text-gray-700 dark:text-gray-200 ocean:text-ocean-foreground">
                {d.set} × {d.repetition} {d.weight ? `× ${d.weight}кг` : ""}
              </Text>
            </View>
          ))}
        </View>

        {/* Примечания */}
        {t.note && (
          <Text className="text-xs text-muted-foreground mt-1 dark:text-gray-400 ocean:text-ocean-foreground/60">
            {t.note}
          </Text>
        )}
      </View>
    ))}
  </View>
);
