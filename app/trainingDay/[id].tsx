import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import TrainingTimer from "@/components/trainingDay/TrainingTimer";
import TrainingActions from "@/components/trainingDay/TrainingActions";
import TrainingStats from "@/components/trainingDay/TrainingStats";
import { useTrainingDay } from "@/hooks/useTrainingDay";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/trainingDay/Header";
import TrainingExercisesList from "@/components/trainingDay/TrainingExercisesList";
import { useTheme } from "@/contexts/ThemeContext"; // ✅ Импортируем хук темы

export default function TrainingDayDetailScreen() {
  const router = useNavigation();
  const { id } = useLocalSearchParams(); // получаем id из URL
  const { user } = useAuth();
  const { theme } = useTheme(); // ✅ Получаем текущую тему

  const { trainingDay, isStarted, time, start, /*finish, */ remove } =
    useTrainingDay(Number(id), user?.id);

  // --- Адаптивные классы ---
  const screenBg = "bg-background dark:bg-gray-900 ocean:bg-ocean-background";
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const primaryButtonBg =
    "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";

  // Классы для кнопки "Назад" в случае ошибки
  const errorButtonClass = `${primaryButtonBg} p-3 rounded-lg mt-4`;

  if (!trainingDay) {
    return (
      // ✅ АДАПТАЦИЯ: Фон экрана и отступы
      <View className={`flex-1 p-4 ${screenBg}`}>
        <Text
          // ✅ АДАПТАЦИЯ: Цвет текста ошибки
          className={`text-lg text-center mt-6 ${textFg}`}
        >
          Тренировка не найдена
        </Text>
        <TouchableOpacity
          // ✅ АДАПТАЦИЯ: Фон кнопки
          className={errorButtonClass}
          onPress={() => router.goBack()}
        >
          <Text className="text-white font-bold text-center">Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // ✅ АДАПТАЦИЯ: Фон основного контейнера
    <View className={`flex-1 ${screenBg}`}>
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
      <ScrollView
        className=" p-2 m-2 rounded-2xl"
        showsVerticalScrollIndicator={false}
      >
        <TrainingStats trainingDay={trainingDay} />

        <TrainingExercisesList trainingDay={trainingDay} />
      </ScrollView>
    </View>
  );
}
