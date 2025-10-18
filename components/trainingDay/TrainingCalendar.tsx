import React from "react";
import {FlatList, Text, View} from "react-native";
import TrainingCard from "./TrainingCard";
import {Calendar} from "@/components/ui/calendar";
import {TrainingDay} from "@/types/trainingDay";
import {CalendarLegend} from "@/components/trainingDay/CalendarLegend";

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
		<View className="bg-white rounded-lg mb-4">
			<Text className="text-2xl font-bold text-black text-left px-4 py-2">
				Календарь тренировок
			</Text>
			<Calendar
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				trainingDays={calendarData}
			/>
			{/* Легенда */}
			<CalendarLegend/>
		</View>
	);

	return (
		<FlatList
			data={selectedForDay}
			keyExtractor={(trainingDay) => trainingDay.id.toString()}
			renderItem={({item}) => <TrainingCard trainingDay={item}/>}
			ListHeaderComponent={ListHeader}
			ListEmptyComponent={
				selectedDate ? (
					<Text className="text-center mt-2 text-gray-500">
						Нет тренировок на эту дату
					</Text>
				) : null
			}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{paddingBottom: 20}}
		/>
	);
};