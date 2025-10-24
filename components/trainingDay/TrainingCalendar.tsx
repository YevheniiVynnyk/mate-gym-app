import React from "react";
import { FlatList, Text /*View */ } from "react-native";
import TrainingCard from "./TrainingCard";
import { CalendarUI } from "@/components/ui/CalendarUI";
import { TrainingDay } from "@/types/trainingDay";
import { CalendarLegend } from "@/components/trainingDay/CalendarLegend";
import { CardUI /*cn */ } from "@/components/ui/CardUI";

interface TrainingCalendarProps {
  selectedDate: string | undefined;
  setSelectedDate: (date: string) => void;
  trainingDays: TrainingDay[];
}

export const TrainingCalendar: React.FC<TrainingCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  trainingDays,
}) => {
  const calendarData = trainingDays.map((td) => ({
    date: new Date(td.date).toISOString().split("T")[0],
    status: td.status,
  }));

  const selectedForDay = selectedDate
    ? trainingDays.filter(
        (td) => new Date(td.date).toISOString().split("T")[0] === selectedDate
      )
    : [];

  // Контент сверху (календарь + легенда)
  const ListHeader = () => (
    <CardUI className="rounded-lg mb-4 p-0 text-center">
      {/* Заголовок. Убираем фиксированный bg-white и text-black, используем адаптивные классы CardUI */}

      <CalendarUI
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        trainingDays={calendarData}
      />
      {/* Легенда */}
      <CalendarLegend />
    </CardUI>
  );

  return (
    <FlatList
      data={selectedForDay}
      keyExtractor={(trainingDay) => trainingDay.id.toString()}
      renderItem={({ item }) => <TrainingCard trainingDay={item} />}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={
        selectedDate ? (
          <Text className="text-center mt-2 text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70">
            Нет тренировок на эту дату
          </Text>
        ) : null
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};
