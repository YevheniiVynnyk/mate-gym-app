import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Search, ShoppingCart } from "lucide-react-native";
import PlanCard, { TrainingPlan } from "@/components/plans/PlanCard";

const TrainingPlansPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
	const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

	const trainingPlans: TrainingPlan[] = [
		{
			id: "1",
			title: "Домашняя сила",
			description: "Эффективные тренировки дома без дополнительного оборудования",
			price: 1999,
			originalPrice: 2999,
			duration: "месяц",
			level: "beginner",
			equipmentType: "home",
			exercises: 45,
			workoutsPerWeek: 3,
			features: [
				"Видео-инструкции для каждого упражнения",
				"Программа на 4 недели",
				"Упражнения с собственным весом",
				"Чат-поддержка тренера",
				"Трекинг прогресса",
			],
			popular: true,
		},
		{
			id: "2",
			title: "Уличная атлетика",
			description: "Воркаут программа для турника и брусьев",
			price: 2499,
			duration: "месяц",
			level: "intermediate",
			equipmentType: "home",
			exercises: 35,
			workoutsPerWeek: 4,
			features: [
				"Прогрессия от простого к сложному",
				"Техника выполнения элементов",
				"Программа силовой выносливости",
				"Подготовка к элементам",
				"Растяжка и восстановление",
			],
		},
	];

	const equipmentFilters = [
		{ id: "home", label: "Дом/Улица" },
		{ id: "basic-gym", label: "Малый зал" },
		{ id: "full-gym", label: "Полный зал" },
	];

	const levelFilters = [
		{ id: "beginner", label: "Начинающий" },
		{ id: "intermediate", label: "Средний" },
		{ id: "advanced", label: "Продвинутый" },
	];

	const filteredPlans = trainingPlans.filter((plan) => {
		const matchesSearch =
			plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			plan.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesEquipment =
			!selectedEquipment || plan.equipmentType === selectedEquipment;
		const matchesLevel = !selectedLevel || plan.level === selectedLevel;

		return matchesSearch && matchesEquipment && matchesLevel;
	});

	return (
		<ScrollView className="flex-1 bg-gray-50 p-4">
			{/* Заголовок */}
			<View className="flex-row items-center mb-4 space-x-2">
				<ShoppingCart color="#007bff" size={28} />
				<View>
					<Text className="text-xl font-bold text-gray-900">Планы тренировок</Text>
					<Text className="text-gray-500 text-sm">
						Выберите программу под ваш инвентарь и уровень
					</Text>
				</View>
			</View>

			{/* Поиск */}
			<View className="mb-3">
				<View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
					<Search size={18} color="#888" />
					<TextInput
						className="flex-1 ml-2 text-base text-gray-800"
						placeholder="Поиск по названию..."
						value={searchTerm}
						onChangeText={setSearchTerm}
					/>
				</View>
			</View>

			{/* Фильтры */}
			<Text className="font-semibold text-gray-700 mt-2 mb-1">Оборудование</Text>
			<View className="flex-row flex-wrap mb-3">
				{equipmentFilters.map((filter) => (
					<TouchableOpacity
						key={filter.id}
						className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
							selectedEquipment === filter.id ? "bg-blue-500" : "bg-gray-200"
						}`}
						onPress={() =>
							setSelectedEquipment(selectedEquipment === filter.id ? null : filter.id)
						}
					>
						<Text
							className={`text-sm ${
								selectedEquipment === filter.id ? "text-white" : "text-gray-800"
							}`}
						>
							{filter.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<Text className="font-semibold text-gray-700 mb-1">Уровень</Text>
			<View className="flex-row flex-wrap mb-3">
				{levelFilters.map((filter) => (
					<TouchableOpacity
						key={filter.id}
						className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
							selectedLevel === filter.id ? "bg-blue-500" : "bg-gray-200"
						}`}
						onPress={() =>
							setSelectedLevel(selectedLevel === filter.id ? null : filter.id)
						}
					>
						<Text
							className={`text-sm ${
								selectedLevel === filter.id ? "text-white" : "text-gray-800"
							}`}
						>
							{filter.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Количество найденных */}
			<Text className="text-gray-600 mb-2">
				Найдено планов: {filteredPlans.length}
			</Text>

			{/* Карточки планов */}
			<View>
				{filteredPlans.map((plan) => (
					<PlanCard
						key={plan.id}
						plan={plan}
						onPurchase={() => console.log("buy", plan.id)}
						isPurchased={false}
					/>
				))}
			</View>

			{filteredPlans.length === 0 && (
				<View className="items-center mt-10">
					<ShoppingCart size={48} color="#999" />
					<Text className="text-gray-500 mt-3 text-center">Планы не найдены</Text>
					<TouchableOpacity
						className="mt-4 bg-blue-500 px-5 py-2 rounded-lg"
						onPress={() => {
							setSearchTerm("");
							setSelectedEquipment(null);
							setSelectedLevel(null);
						}}
					>
						<Text className="text-white font-medium">Сбросить фильтры</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
};

export default TrainingPlansPage;