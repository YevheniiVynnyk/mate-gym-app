import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Calendar, Plus, Target, TrendingUp, UserRoundPen} from "lucide-react-native";
import {useAuth} from "@/contexts/AuthContext";
import {useDashboardData} from "@/hooks/useDashboardData";
import {StatCard} from "@/components/dashboard/StatCard";
import {ActionCard} from "@/components/dashboard/ActionCard";
import TrainingCard from "@/components/trainingDay/TrainingCard";
import {useNavigation} from "@/hooks/useNavigation";

export default function Dashboard() {
	const router = useNavigation();
	const {user} = useAuth();
	const {trainingDays, quickStats, loading} = useDashboardData();
	if (loading) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text className="text-gray-500">Загрузка...</Text>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
				<View className="my-4 p-2">
					<Text className="text-lg font-bold mb-2">📊 Статистика</Text>
					<View className="flex-row justify-between">
						<StatCard title="Всего тренировок" value={quickStats.totalTrainings.toString()}/>
						<StatCard
							title="Завершено"
							value={quickStats.completedTrainings.toString()}
							subtitle={`${
								quickStats.totalTrainings
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
			<View className="my-6 p-2">
				<Text className="text-lg font-bold mb-2">⚡ Быстрые действия</Text>
				<View className="flex-row flex-wrap justify-between">
					<ActionCard icon={<Plus size={24} color="#22c55e"/>} label="Новая"
								onPress={router.toCreateTrainingDay}/>
					<ActionCard icon={<Calendar size={24} color="#22c55e"/>} label="Мои"
								onPress={router.toTrainingList}/>
					<ActionCard icon={<TrendingUp size={24} color="#f59e0b"/>} label="Прогресс"
								onPress={router.toProgress}/>
					<ActionCard icon={<UserRoundPen size={24} color="#f59e0b"/>} label="Прогресс"
								onPress={router.toProfile}/>
				</View>
			</View>

			{/* Последние тренировки */}
			<View className="my-6 p-2">
				<Text className="text-lg font-bold mb-2">📅 Последние тренировки</Text>

				{trainingDays.length === 0 ? (
					<View className="items-center p-6">
						<Target size={48} color="#ccc"/>
						<Text className="text-gray-500 my-2">У вас пока нет тренировок</Text>
						<TouchableOpacity
							className="flex-row items-center bg-green-500 px-4 py-2 rounded-lg"
							onPress={router.toCreateTrainingDay}
						>
							<Plus size={16} color="#fff"/>
							<Text className="text-white ml-2">Создать первую тренировку</Text>
						</TouchableOpacity>
					</View>
				) : (
					trainingDays.map((td) => <TrainingCard key={td.id} trainingDay={td}/>)
				)}
			</View>
		</ScrollView>
	);
}