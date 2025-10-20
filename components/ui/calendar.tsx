import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import dayjs from "dayjs";
import {ChevronLeft, ChevronRight} from "lucide-react-native";

export type DayStatus = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED';

interface CalendarProps {
	selectedDate: string | undefined;
	setSelectedDate: (date: string) => void;
	trainingDays: { date: string; status: DayStatus }[];
}

export const Calendar: React.FC<CalendarProps> = ({
													  selectedDate,
													  setSelectedDate,
													  trainingDays,
												  }) => {
	const [currentMonth, setCurrentMonth] = useState(dayjs());

	const today = dayjs().format("YYYY-MM-DD");

	// Начало и конец месяца
	const startOfMonth = currentMonth.startOf("month");
	const endOfMonth = currentMonth.endOf("month");
	const daysInMonth = endOfMonth.date();

	// Начало недели с понедельника
	const startDay = (startOfMonth.day() + 6) % 7;

	// Составляем недели
	const weeks: { day: number; monthOffset: number }[][] = [];
	let dayCounter = 1 - startDay;
	for (let week = 0; week < 6; week++) {
		const days: { day: number; monthOffset: number }[] = [];
		for (let d = 0; d < 7; d++) {
			let monthOffset = 0;
			let day = dayCounter;
			if (dayCounter < 1) {
				day = startOfMonth.subtract(1, "month").endOf("month").date() + dayCounter;
				monthOffset = -1;
			} else if (dayCounter > daysInMonth) {
				day = dayCounter - daysInMonth;
				monthOffset = 1;
			}
			days.push({day, monthOffset});
			dayCounter++;
		}
		weeks.push(days);
	}

	const getDayStyle = (dayObj: { day: number; monthOffset: number }) => {
		const {day, monthOffset} = dayObj;
		let dateKey = currentMonth.date(day).format("YYYY-MM-DD");
		if (monthOffset === -1) dateKey = currentMonth.subtract(1, "month").date(day).format("YYYY-MM-DD");
		if (monthOffset === 1) dateKey = currentMonth.add(1, "month").date(day).format("YYYY-MM-DD");

		const td = trainingDays.find((t) => t.date === dateKey);
		const isSelected = dateKey === selectedDate;
		const isToday = dateKey === today;

		if (isSelected) return {bg: "#F0F0F0", color: "#000", border: "#2563EB"};
		if (isToday) return {bg: "#F0F0F0", color: monthOffset === 0 ? "#000" : "#A0A0A0", border: "#16A34A"};
		if (!td) return {bg: "#fff", color: monthOffset === 0 ? "#000" : "#A0A0A0"};

		switch (td.status) {
			case "COMPLETED":
				return {bg: "#22C55E30", color: "#16A34A"};
			case "IN_PROGRESS":
				return {bg: "#3B82F630", color: "#1D4ED8"};
			default:
				return {bg: "#F0F0F0", color: "#000"};
		}
	};

	const handleDayPress = (dayObj: { day: number; monthOffset: number }) => {
		let date = currentMonth.date(dayObj.day);
		if (dayObj.monthOffset === -1) date = currentMonth.subtract(1, "month").date(dayObj.day);
		if (dayObj.monthOffset === 1) date = currentMonth.add(1, "month").date(dayObj.day);
		setSelectedDate(date.format("YYYY-MM-DD"));
	};

	return (
		<View className="bg-white rounded-md">
			{/* Header */}
			<View className="flex-row justify-between items-center px-4 py-2">
				<TouchableOpacity
					onPress={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
					className="p-1"
				>
					<ChevronLeft size={24} color="#16A34A"/>
				</TouchableOpacity>
				<Text className="text-xl font-semibold text-green-500">
					{currentMonth.format("MMMM YYYY")}
				</Text>
				<TouchableOpacity
					onPress={() => setCurrentMonth(currentMonth.add(1, "month"))}
					className="p-1"
				>
					<ChevronRight size={24} color="#16A34A"/>
				</TouchableOpacity>
			</View>

			{/* Days of week */}
			<View className="flex-row justify-between px-4 mt-2">
				{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
					<Text key={d} className="text-center w-10 font-bold text-gray-500 mb-2">
						{d}
					</Text>
				))}
			</View>

			{/* Days */}
			{weeks.map((week, i) => (
				<View key={i} className="flex-row justify-between px-4 mt-1">
					{week.map((dayObj, j) => {
						const style = getDayStyle(dayObj);
						return (
							<TouchableOpacity
								key={j}
								className="w-10 h-10 justify-center items-center rounded-lg"
								style={{
									backgroundColor: style.bg,
									borderWidth: style.border ? 2 : 0,
									borderColor: style.border || "transparent",
								}}
								onPress={() => handleDayPress(dayObj)}
							>
								<Text
									style={{
										color: style.color,
										fontWeight: style.color === "#fff" ? "bold" : "500",
									}}
								>
									{dayObj.day}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			))}
		</View>
	);
};