import React from "react";
import {ScrollView, Text, View} from "react-native";
import TrainingCard from "@/components/trainingDay/TrainingCard";
import {TrainingSearch} from "@/components/trainingDay/TrainingSearch";

interface TrainingListProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	filteredDays: any[];
}

export const TrainingList: React.FC<TrainingListProps> = ({
															  searchTerm,
															  setSearchTerm,
															  filteredDays,
														  }) => {
	return (
		<View className="flex-1">
			<TrainingSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			<ScrollView
				className="flex-1 p-2"
				showsVerticalScrollIndicator={false}
			>
				{filteredDays.length > 0 ? (
					filteredDays.map((td) => (
						<TrainingCard key={td.id} trainingDay={td}/>
					))
				) : (
					<Text className="text-center text-gray-400 mt-4">
						Тренировки не найдены
					</Text>
				)}
			</ScrollView>
		</View>
	);
};