import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar, Clock, TrendingUp } from "lucide-react-native";
import { QuickStatDTO, statisticsService, WeeklyActivityDTO } from "@/services/statisticsService";
import { BodyDTO, bodyService } from "@/services/bodyService";
import { formatDuration } from "@/lib/utils";

export default function Progress() {
	const [quickStats, setQuickStats] = useState<QuickStatDTO | null>(null);
	const [weeklyStats, setWeeklyStats] = useState<WeeklyActivityDTO[] | null>(null);
	const [bodyData, setBodyData] = useState<BodyDTO[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const quickStats = await statisticsService.getQuickStatistics().catch(() => null);
				const weeklyStats = await statisticsService.getWeeklyStats().catch(() => []);
				const bodyData = await bodyService.getAllBodyRecords().catch(() => []);
				setQuickStats(quickStats);
				setWeeklyStats(weeklyStats);
				setBodyData(bodyData);
			} catch (e) {
				console.error("Ошибка загрузки данных", e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const totalDays = weeklyStats?.length ?? 0;
	const completedDays = weeklyStats?.filter((s) => s.completed).length ?? 0;
	const weekProgress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

	const noData =
		!quickStats &&
		(!weeklyStats || weeklyStats.length === 0) &&
		(!bodyData || bodyData.length === 0);

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center p-5">
				<ActivityIndicator size="large" color="#007AFF" />
				<Text className="mt-2 text-base text-gray-700">Загрузка...</Text>
			</View>
		);
	}

	if (noData) {
		return (
			<View className="flex-1 justify-center items-center p-5">
				<TrendingUp size={50} color="#999" />
				<Text className="text-xl font-bold mt-2 text-center">Нет данных для отображения</Text>
				<Text className="text-center text-gray-500 mt-1">
					Похоже, вы ещё не добавили ни одной тренировки или записи о весе.
				</Text>
				<TouchableOpacity
					className="bg-blue-500 px-4 py-3 rounded-lg mt-4"
					onPress={() => console.log("Добавить тренировку")}
				>
					<Text className="text-white font-bold">➕ Добавить первую тренировку</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-white px-4 pt-4">
			{/* Заголовок */}
			<View className="flex-row items-center gap-2 mb-4">
				<TrendingUp size={28} color="#007AFF" />
				<Text className="text-2xl font-bold">Мой прогресс</Text>
			</View>

			{/* Активность на неделе */}
			<View className="bg-gray-50 p-4 rounded-xl mb-4">
				<View className="flex-row items-center mb-3">
					<Calendar size={20} color="#000" />
					<Text className="ml-2 text-lg font-bold">Активность на этой неделе</Text>
				</View>

				{weeklyStats && weeklyStats.length > 0 ? (
					<>
						<View className="flex-row justify-between mb-3">
							{weeklyStats.map((stat) => (
								<View key={stat.day} className="items-center">
									<Text className="text-xs">{stat.day}</Text>
									<View
										className={`w-7 h-7 rounded-full items-center justify-center ${
											stat.completed ? "bg-blue-500" : "bg-gray-400"
										}`}
									>
										<Text className="text-white">{stat.completed ? "✓" : "○"}</Text>
									</View>
								</View>
							))}
						</View>

						<View>
							<View className="flex-row justify-between">
								<Text className="text-sm">Прогресс недели</Text>
								<Text className="text-sm">{completedDays}/{totalDays} дней</Text>
							</View>
							<View className="h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
								<View className="h-2 bg-blue-500 rounded-full" style={{ width: `${weekProgress}%` }} />
							</View>
						</View>
					</>
				) : (
					<Text className="text-center text-gray-500">Нет данных за эту неделю</Text>
				)}
			</View>

			{/* Общая статистика */}
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

			{/* Время тренировок */}
			<View className="bg-gray-50 p-4 rounded-xl mb-10">
				<View className="flex-row items-center mb-2">
					<Clock size={20} color="#000" />
					<Text className="ml-2 text-lg font-bold">Время тренировок</Text>
				</View>
				<Text className="text-center text-gray-500">Данные скоро будут доступны</Text>
			</View>
		</ScrollView>
	);
}
