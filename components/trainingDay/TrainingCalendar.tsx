import React from "react";
import {FlatList, ScrollView, Text, View} from "react-native";
import TrainingCard from "./TrainingCard";
import {Calendar} from "@/components/ui/calendar";
import {TrainingDay} from "@/types/trainingDay";

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
    // Преобразуем trainingDays для календаря
    const calendarData = trainingDays.map((td) => ({
        date: new Date(td.date).toISOString().split('T')[0],
        status: td.status,
    }));

    const selectedForDay = selectedDate
        ? trainingDays.filter(
              (td) => new Date(td.date).toISOString().split('T')[0] === selectedDate,
          )
        : [];

    return (
        <ScrollView className="flex-1"
        showsVerticalScrollIndicator={false}>
            <View className="bg-white rounded-lg p-2">
                <Text className="text-2xl font-bold text-black text-left px-4 py-2">Календарь тренировок</Text>
                <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    trainingDays={calendarData}
                />
                {/* Легенда */}
                <View className="px-6 pb-4 mt-4">
                    <View className="flex flex-row flex-wrap gap-4 text-sm">
                        {/* Текущая дата */}
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full border-2 border-green-500" />
                            <Text className="text-sm">Сегодня</Text>
                        </View>

                        {/* Выбраная дата */}
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full border-2 border-blue-500" />
                            <Text className="text-sm">Обрана дата</Text>
                        </View>

                        {/* Запланировано */}
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full bg-blue-500" />
                            <Text className="text-sm">Запланировано</Text>
                        </View>

                        {/* Завершено */}
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full bg-green-500" />
                            <Text className="text-sm">Завершено</Text>
                        </View>
                    </View>
                </View>
            </View>

            {selectedDate && (
                <View className="mt-4 px-4">
                    <Text className="font-bold text-lg mb-2">Тренировки на {selectedDate}</Text>

                    {selectedForDay.length > 0 ? (
                        <FlatList
                            data={selectedForDay}
                            keyExtractor={(trainingDay) => trainingDay.id.toString()}
                            renderItem={({ item }) => <TrainingCard trainingDay={item} />}
                        />
                    ) : (
                        <Text className="text-center mt-2 text-gray-500">
                            Нет тренировок на эту дату
                        </Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
};
