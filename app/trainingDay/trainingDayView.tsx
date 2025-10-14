import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTrainingDaysData } from "@/hooks/useTrainingDays";
import TrainingCard from "@/components/trainingDay/TrainingCard";
import { TrainingCalendar } from "@/components/trainingDay/TrainingCalendar";
import { TrainingSearch } from "@/components/trainingDay/TrainingSearch";

export default function TrainingDayView() {
	const navigation = useNavigation();
	const { trainingDays, isLoading } = useTrainingDaysData();

	const [activeTab, setActiveTab] = useState("calendar");
	const [selectedDate, setSelectedDate] = useState<string>();
	const [searchTerm, setSearchTerm] = useState("");

	const filteredDays = trainingDays.filter((td) =>
		td.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (isLoading)
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" />
			</View>
		);

	return (
		<ScrollView className="flex-1 p-4">
			<View className="mb-4">
				<Text className="text-2xl font-bold">Мои тренировки</Text>
				<Text className="text-gray-500">Планируйте и отслеживайте тренировки</Text>
			</View>

			<TouchableOpacity
				className="bg-primary p-3 rounded-xl mb-4"
				onPress={() => navigation.navigate("CreateTrainingDay")}
			>
				<Text className="text-white text-center font-semibold">Создать тренировку</Text>
			</TouchableOpacity>

			{/* Tabs */}
			<View className="flex-row mb-4 rounded-xl overflow-hidden">
				{["calendar", "list"].map((tab) => (
					<TouchableOpacity
						key={tab}
						className={`flex-1 p-3 items-center ${
							activeTab === tab ? "bg-primary" : "bg-gray-300"
						}`}
						onPress={() => setActiveTab(tab)}
					>
						<Text
							className={`font-semibold ${
								activeTab === tab ? "text-white" : "text-gray-700"
							}`}
						>
							{tab === "calendar" ? "Календарь" : "Список"}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{activeTab === "calendar" ? (
				<TrainingCalendar
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					trainingDays={trainingDays}
				/>
			) : (
				<View>
					<TrainingSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					{filteredDays.length > 0 ? (
						filteredDays.map((td) => <TrainingCard key={td.id} trainingDay={td} />)
					) : (
						<Text className="text-center text-gray-400 mt-4">
							Тренировки не найдены
						</Text>
					)}
				</View>
			)}
		</ScrollView>
	);
}