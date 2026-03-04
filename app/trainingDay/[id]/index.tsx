import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import TrainingActions from "@/components/trainingDay/TrainingActions";
import TrainingStats from "@/components/trainingDay/TrainingStats";
import { useTrainingDay } from "@/hooks/useTrainingDay";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/trainingDay/Header";
import TrainingExercisesList from "@/components/trainingDay/TrainingExercisesList";

export default function TrainingDayId() {
  const router = useNavigation();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const { trainingDay, complete, remove } = useTrainingDay(
    Number(id),
    user?.id,
  );

  // --- Адаптивные классы ---
  const screenBg = "bg-background dark:bg-gray-900 ocean:bg-ocean-background";
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const primaryButtonBg =
    "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";

  const errorButtonClass = `${primaryButtonBg} p-3 rounded-lg mt-4`;

  if (!trainingDay) {
    return (
      <View className={`flex-1 p-4 ${screenBg}`}>
        <Text className={`text-lg text-center mt-6 ${textFg}`}>
          Тренировка не найдена
        </Text>
        <TouchableOpacity
          className={errorButtonClass}
          onPress={() => router.goBack()}
        >
          <Text className="text-white font-bold text-center">Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className={`flex-1 ${screenBg}`}>
      <Header title={trainingDay.name} onBack={() => router.goBack()} />

      <TrainingActions
        status={trainingDay.status}
        onComplete={complete}
        onEdit={() =>
          router.toTrainingEdit({
            id: trainingDay.id.toString(),
            // userId: user?.id.toString(),
            selectedDate: new Date().toISOString(),
            prefilledData: trainingDay,
          })
        }
        onRepeat={() => router.goBack()}
        onDelete={async () => {
          await remove();
          router.goBack();
        }}
      />

      <ScrollView
        className="p-2 m-2 rounded-2xl"
        showsVerticalScrollIndicator={false}
      >
        <TrainingStats trainingDay={trainingDay} />
        <TrainingExercisesList trainingDay={trainingDay} />
      </ScrollView>
    </View>
  );
}
