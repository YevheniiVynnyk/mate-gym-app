import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import TrainingCard from "./TrainingCard";

export const TrainingCalendar = ({
									 selectedDate,
									 setSelectedDate,
									 trainingDays,
								 }) => {
	const selected = selectedDate
		? trainingDays.filter(
			(td) => td.date.toISOString().split("T")[0] === selectedDate
		)
		: [];

	return (
		<View>
			<Calendar
				onDayPress={(day) => setSelectedDate(day.dateString)}
				markedDates={{
					[selectedDate || ""]: { selected: true, selectedColor: "#00adf5" },
				}}
			/>
			{selectedDate && (
				<View style={{ marginTop: 10 }}>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>
						Тренировки на {selectedDate}
					</Text>
					{selected.length > 0 ? (
						selected.map((td) => <TrainingCard key={td.id} trainingDay={td} />)
					) : (
						<Text style={{ textAlign: "center", marginTop: 10 }}>
							Нет тренировок на эту дату
						</Text>
					)}
				</View>
			)}
		</View>
	);
};