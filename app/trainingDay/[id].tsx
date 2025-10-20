import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import TrainingTimer from "@/components/trainingDay/TrainingTimer";
import TrainingActions from "@/components/trainingDay/TrainingActions";
import TrainingStats from "@/components/trainingDay/TrainingStats";
import { useTrainingDay } from "@/hooks/useTrainingDay";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/trainingDay/Header";
import TrainingExercisesList from "@/components/trainingDay/TrainingExercisesList";

export default function Id() {
  const router = useNavigation();
  const { id } = useLocalSearchParams(); // получаем id из URL
  const { user } = useAuth();
  const { trainingDay, isStarted, time, start, /*finish, */ remove } =
    useTrainingDay(Number(id), user?.id);

  if (!trainingDay) {
    return (
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg text-center mt-6">Тренировка не найдена</Text>
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg mt-4"
          onPress={() => router.goBack()}
        >
          <Text className="text-white font-bold">Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Header title={trainingDay.name} onBack={() => router.goBack()} />

      {isStarted && <TrainingTimer time={time} />}

      <TrainingActions
        // isStarted={isStarted} ToDo доделать
        status={trainingDay.status}
        onStart={start}
        onEdit={() =>
          router.toTrainingEdit({
            id: trainingDay.id,
            clientId: user?.id.toString(),
            selectedDate: new Date().toISOString(),
            prefilledData: trainingDay,
          })
        }
        onRepeat={() => router.goBack()}
        // onFinish={finish} ToDo доделать
        onDelete={async () => {
          await remove();
          router.goBack();
        }}
      />
      <TrainingStats trainingDay={trainingDay} />

      <TrainingExercisesList trainingDay={trainingDay} />
    </View>
  );
}
