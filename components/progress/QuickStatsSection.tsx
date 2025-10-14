import {Text, View} from "react-native";
import {formatDuration} from "@/lib/utils";

export default function QuickStatsSection({quickStats}: any) {
	return (
		<View className="bg-gray-50 p-4 rounded-xl mb-4">
			<Text className="text-lg font-bold mb-2">Общая статистика</Text>
			{quickStats ? (
				<>
					<View className="flex-row justify-between mb-1">
						<Text className="text-gray-600">Всего тренировок</Text>
						<Text className="font-bold">{quickStats.totalTrainings}</Text>
					</View>

					<View className="flex-row justify-between mb-1">
						<Text className="text-gray-600">Завершено</Text>
						<Text className="font-bold">
							{quickStats.totalTrainings
								? ((quickStats.completedTrainings / quickStats.totalTrainings) * 100).toFixed(0)
								: 0}
							%
						</Text>
					</View>

					<View className="flex-row justify-between mb-1">
						<Text className="text-gray-600">Время тренировок</Text>
						<Text className="font-bold">{formatDuration(quickStats.totalTimeMinutes)}</Text>
					</View>

					<View className="flex-row justify-between">
						<Text className="text-gray-600">Среднее время</Text>
						<Text className="font-bold">{formatDuration(quickStats.averageDurationMinutes)}</Text>
					</View>
				</>
			) : (
				<Text className="text-center text-gray-500">Нет данных статистики</Text>
			)}
		</View>
	);
}