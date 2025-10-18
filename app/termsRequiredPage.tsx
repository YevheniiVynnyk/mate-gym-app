import React, {useState} from "react";
import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Filter, Search, ShoppingCart} from "lucide-react-native";
import PlanCard, {TrainingPlan} from "@/components/plans/PlanCard";

const TrainingPlansForm: React.FC = () => {
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
		{id: "home", label: "Дом/Улица"},
		{id: "basic-gym", label: "Малый зал"},
		{id: "full-gym", label: "Полный зал"},
	];

	const levelFilters = [
		{id: "beginner", label: "Начинающий"},
		{id: "intermediate", label: "Средний"},
		{id: "advanced", label: "Продвинутый"},
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

	const toggleEquipment = (id: string) => {
		setSelectedEquipment(selectedEquipment === id ? null : id);
	};

	const toggleLevel = (id: string) => {
		setSelectedLevel(selectedLevel === id ? null : id);
	};

	const resetFilters = () => {
		setSelectedEquipment(null);
		setSelectedLevel(null);
		setSearchTerm("");
	};

	const handlePurchase = (planId: string) => {
		console.log(`Покупка плана: ${planId}`);
	};

	return (
		<ScrollView className="flex-1 bg-white p-4">
			{/* Header */}
			<View className="flex-row items-center mb-4">
				<ShoppingCart size={32} color="#3b82f6"/>
				<View className="ml-2">
					<Text className="text-2xl font-bold text-gray-900">Планы тренировок</Text>
					<Text className="text-gray-500 text-sm">
						Выберите программу под ваш инвентарь и уровень
					</Text>
				</View>
			</View>

			{/* Поиск и фильтры */}
			<View className="mb-4">
				{/* Поиск */}
				<View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
					<Search size={20} color="#999"/>
					<TextInput
						className="flex-1 ml-2 text-base"
						placeholder="Поиск по названию или описанию..."
						value={searchTerm}
						onChangeText={setSearchTerm}
					/>
				</View>

				{/* Фильтры по оборудованию */}
				<View className="mt-4">
					<View className="flex-row items-center mb-2">
						<Filter size={16} color="#000"/>
						<Text className="ml-1 text-gray-700 font-medium">Оборудование:</Text>
					</View>
					<View className="flex-row flex-wrap">
						{equipmentFilters.map((filter) => (
							<TouchableOpacity
								key={filter.id}
								className={`px-3 py-1.5 rounded-full border m-1 ${
									selectedEquipment === filter.id
										? "bg-primary border-primary"
										: "border-gray-300"
								}`}
								onPress={() => toggleEquipment(filter.id)}
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
				</View>

				{/* Фильтры по уровню */}
				<View className="mt-4">
					<Text className="text-gray-700 font-medium mb-1">Уровень:</Text>
					<View className="flex-row flex-wrap">
						{levelFilters.map((filter) => (
							<TouchableOpacity
								key={filter.id}
								className={`px-3 py-1.5 rounded-full border m-1 ${
									selectedLevel === filter.id
										? "bg-blue-500 border-blue-500"
										: "border-gray-300"
								}`}
								onPress={() => toggleLevel(filter.id)}
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
				</View>

				{(selectedEquipment || selectedLevel || searchTerm) && (
					<TouchableOpacity
						className="mt-3 border border-blue-500 rounded-lg py-2 items-center"
						onPress={resetFilters}
					>
						<Text className="text-blue-500 font-medium">Сбросить фильтры</Text>
					</TouchableOpacity>
				)}
			</View>

			{/* Результаты */}
			<Text className="text-gray-600 mb-2">
				Найдено планов: {filteredPlans.length}
			</Text>

			{filteredPlans.length > 0 ? (
				<FlatList
					data={filteredPlans}
					keyExtractor={(item) => item.id}
					renderItem={({item}) => (
						<PlanCard plan={item} onPurchase={handlePurchase} isPurchased={false}/>
					)}
					contentContainerStyle={{paddingBottom: 60}}
				/>
			) : (
				<View className="items-center mt-12">
					<ShoppingCart size={48} color="#999"/>
					<Text className="text-gray-500 mt-3 text-center">
						Планы не найдены
					</Text>
					<TouchableOpacity
						className="mt-4 border border-blue-500 rounded-lg py-2 px-4"
						onPress={resetFilters}
					>
						<Text className="text-blue-500 font-medium">Сбросить фильтры</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
};

export default TrainingPlansForm;
