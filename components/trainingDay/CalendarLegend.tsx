import React from "react";
import {Text, View} from "react-native";

const statuses = [
	{label: "Сегодня", color: "border-green-500", bg: false},
	{label: "Обрана дата", color: "border-blue-500", bg: false},
	{label: "Запланировано", color: "bg-blue-500", bg: true},
	{label: "Завершено", color: "bg-green-500", bg: true},
];

export const CalendarLegend = () => (
	<View className="px-6 pb-4 mt-4">
		<View className="flex flex-row flex-wrap gap-4 text-sm">
			{statuses.map((s) => (
				<View key={s.label} className="flex flex-row items-center gap-2">
					<View
						className={`w-3 h-3 rounded-full ${s.bg ? s.color : `border-2 ${s.color}`}`}
					/>
					<Text className="text-sm">{s.label}</Text>
				</View>
			))}
		</View>
	</View>
);