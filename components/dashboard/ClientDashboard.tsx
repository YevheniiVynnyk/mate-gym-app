import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar, Plus, Target, TrendingUp } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { trainingDayService } from "@/services/trainingDayService";
import { QuickStatDTO, statisticsService } from "@/services/statisticsService";
import { TrainingDay } from "@/types/trainingDay";
import { mapFromAPI } from "@/services/mapper/trainingDayMapper";

interface ClientDashboardProps {
	onViewTrainingDays: () => void;
	onCreateTrainingDay: () => void;
}

export default function ClientDashboard({
											onViewTrainingDays,
											onCreateTrainingDay,
										}: ClientDashboardProps) {
	const router = useRouter();
	const { user } = useAuth();
	const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
	const [quickStats, setQuickStats] = useState<QuickStatDTO | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const latest = await trainingDayService.getLatestThree();
				setTrainingDays(latest.map(mapFromAPI));

				const stats = await statisticsService.getQuickStatistics();
				setQuickStats(stats);
			} catch (e) {
				console.error("Ошибка загрузки данных", e);
			}
		};
		fetchData();
	}, []);

	return (
		<ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16 }}>
			{/* Приветствие */}
			<View className="bg-white p-4 rounded-xl mb-4">
				<Text className="text-xl font-bold">
					Добро пожаловать, {user?.firstName || "Пользователь"}!
				</Text>
				<Text className="text-gray-600 mt-1">
					Готовы к новой тренировке? Посмотрите свой прогресс и запланируйте следующее занятие.
				</Text>
			</View>

			{/* Статистика */}
			{quickStats && (
				<View className="my-4">
					<Text className="text-lg font-bold mb-2">📊 Статистика</Text>
					<View className="flex-row justify-between">
						<StatCard title="Всего тренировок" value={quickStats.totalTrainings.toString()} />
						<StatCard
							title="Завершено"
							value={quickStats.completedTrainings.toString()}
							subtitle={`${quickStats.totalTrainings
								? ((quickStats.completedTrainings / quickStats.totalTrainings) * 100).toFixed(0)
								: 0
							}% от общего числа`}
						/>
						<StatCard
							title="Общее время"
							value={quickStats.totalTimeMinutes.toString()}
							subtitle={`В среднем ${quickStats.averageDurationMinutes}`}
						/>
					</View>
				</View>
			)}

			{/* Быстрые действия */}
			<View className="my-4">
				<Text className="text-lg font-bold mb-2">⚡ Быстрые действия</Text>
				<View className="flex-row flex-wrap justify-between">
					<ActionCard icon={<Plus size={24} color="#22c55e" />} label="Новая" onPress={onCreateTrainingDay} />
					<ActionCard icon={<Calendar size={24} color="#22c55e" />} label="Мои" onPress={onViewTrainingDays} />
					<ActionCard icon={<TrendingUp size={24} color="#f59e0b" />} label="Прогресс" onPress={() => router.push("/progress")} />
				</View>
			</View>

			{/* Последние тренировки */}
			<View className="my-4">
				<Text className="text-lg font-bold mb-2">📅 Последние тренировки</Text>

				{trainingDays.length === 0 ? (
					<View className="items-center p-6">
						<Target size={48} color="#ccc" />
						<Text className="text-gray-500 my-2">У вас пока нет тренировок</Text>
						<TouchableOpacity
							className="flex-row items-center bg-green-500 px-4 py-2 rounded-lg"
							onPress={onCreateTrainingDay}
						>
							<Plus size={16} color="#fff" />
							<Text className="text-white ml-2">Создать первую тренировку</Text>
						</TouchableOpacity>
					</View>
				) : (
					trainingDays.map((trainingDay) => (
						<TouchableOpacity
							key={trainingDay.id}
							className="bg-white p-4 rounded-lg mb-3"
							onPress={() => router.push(`/trainingDay/${trainingDay.id}`)}
						>
							<View className="flex-row justify-between mb-1">
								<Text className="font-bold">{trainingDay.name}</Text>
								<Badge text={trainingDay.status === "COMPLETED" ? "Завершена" : "Запланирована"} />
							</View>
							<Text className="text-gray-500 text-xs mb-1">{trainingDay.date.toLocaleDateString()}</Text>
							<View className="flex-row space-x-3 mt-1">
								<Text>{trainingDay.trainings.length} упражнений</Text>
								{trainingDay.durationMinutes && <Text>{trainingDay.durationMinutes} мин</Text>}
								{user?.role === "TRAINER" && trainingDay.clientId && <Text>Клиент</Text>}
							</View>
						</TouchableOpacity>
					))
				)}
			</View>
		</ScrollView>
	);
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
	return (
		<View className="flex-1 bg-white p-3 rounded-lg mx-1">
			<Text className="text-sm font-bold">{title}</Text>
			<Text className="text-lg font-bold mt-1">{value}</Text>
			{subtitle && <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>}
		</View>
	);
}

function ActionCard({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
	return (
		<TouchableOpacity
			className="w-[48%] bg-white p-4 rounded-lg items-center mb-2"
			onPress={onPress}
		>
			{icon}
			<Text className="mt-2 font-semibold">{label}</Text>
		</TouchableOpacity>
	);
}

function Badge({ text }: { text: string }) {
	return (
		<View className="bg-gray-300 rounded-md px-2 py-0.5">
			<Text className="text-xs">{text}</Text>
		</View>
	);
}
