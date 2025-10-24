import React, { useState } from "react";
import {
  /*ActivityIndicator,*/ Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTrainingDaysData } from "@/hooks/useTrainingDays";
import { TrainingCalendar } from "@/components/trainingDay/TrainingCalendar";
import { TrainingList } from "@/components/trainingDay/TrainingList";
import { useNavigation } from "@/hooks/useNavigation";
import { LoadingPageUI } from "@/components/ui/LoadingPageUI";
import { CardUI, cn } from "@/components/ui/CardUI";

export default function TrainingDayView() {
  const router = useNavigation();

  const { trainingDays, isLoading } = useTrainingDaysData();

  const [activeTab, setActiveTab] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDays = trainingDays.filter((td) =>
    td.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingPageUI />;

  return (
    <View className="flex-1 p-4 bg-background dark:bg-gray-900 ocean:bg-ocean-background">
      {/* Заголовок */}
      <View className="mb-4">
        <Text className="text-2xl text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Мои тренировки
        </Text>
        <Text className="text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70">
          Планируйте и отслеживайте тренировки
        </Text>
      </View>

      {/* Кнопка создания */}
      <TouchableOpacity
        className={cn(
          "p-3 rounded-xl mb-4 active:opacity-80",
          "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary" // Фон кнопки
        )}
        onPress={router.toCreateTrainingDay}
      >
        <Text
          className={cn(
            "text-center font-semibold",
            "text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground" // Текст кнопки
          )}
        >
          Создать тренировку
        </Text>
      </TouchableOpacity>

      {/* Вкладки */}
      <CardUI className="flex-row mb-4 p-0 rounded-xl">
        {["calendar", "list"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              className={cn(
                "flex-1 p-3 items-center rounded-xl",
                // Активная вкладка
                isActive &&
                  "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary",
                // Неактивная вкладка
                !isActive && "bg-card dark:bg-gray-800 ocean:bg-ocean-card"
              )}
              onPress={() => setActiveTab(tab as "calendar" | "list")}
            >
              <Text
                className={cn(
                  "font-semibold rounded-xl",
                  // Текст активной вкладки
                  isActive &&
                    "text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground",
                  // Текст неактивной вкладки
                  !isActive &&
                    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70"
                )}
              >
                {tab === "calendar" ? "Календарь" : "Список"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </CardUI>

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
