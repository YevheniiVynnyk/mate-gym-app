import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTrainingDaysData } from "@/hooks/useTrainingDays";
import { TrainingCalendar } from "@/components/trainingDay/TrainingCalendar";
import { TrainingList } from "@/components/trainingDay/TrainingList";
import { useNavigation } from "@/hooks/useNavigation";

export default function TrainingDayView() {
  const router = useNavigation();

  const { trainingDays, isLoading } = useTrainingDaysData();

  const [activeTab, setActiveTab] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDays = trainingDays.filter((td) =>
    td.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View className="flex-1 p-4">
      {/* Заголовок */}
      <View className="mb-4">
        <Text className="text-2xl font-bold">Мои тренировки</Text>
        <Text className="text-gray-500">
          Планируйте и отслеживайте тренировки
        </Text>
      </View>

      {/* Кнопка создания */}
      <TouchableOpacity
        className="bg-primary p-3 rounded-xl mb-4"
        onPress={router.toCreateTrainingDay}
      >
        <Text className="text-white text-center font-semibold">
          Создать тренировку
        </Text>
      </TouchableOpacity>

      {/* Вкладки */}
      <View className="flex-row mb-4 rounded-xl overflow-hidden">
        {["calendar", "list"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 p-3 items-center ${
              activeTab === tab ? "bg-primary" : "bg-gray-300"
            }`}
            onPress={() => setActiveTab(tab as "calendar" | "list")}
          >
            <Text
              className={`font-semibold ${
                activeTab === tab ? "text-white" : "text-gray-700"
              }`}
            >
              {tab === "calendar" ? "Календарь" : "Список"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Контент */}
      {activeTab === "calendar" ? (
        <TrainingCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          trainingDays={trainingDays}
        />
      ) : (
        <TrainingList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredDays={filteredDays}
        />
      )}
    </View>
  );
}
