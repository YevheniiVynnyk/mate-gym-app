import React from "react";
import {Text, View} from "react-native";

interface ExerciseTotalProps {
	training: {
		trainingDetails: { repetition: number; weight: number }[];
	};
}

export default function ExerciseTotal({training}: ExerciseTotalProps) {
	if (!training?.trainingDetails?.length) return null;

	const totalReps = training.trainingDetails.reduce(
		(sum, set) => sum + (set.repetition || 0),
		0
	);
	const totalWeight = training.trainingDetails.reduce(
		(sum, set) => sum + (set.repetition || 0) * (set.weight || 0),
		0
	);

	return (
		<View className="mt-3">
			<Text className="text-sm font-semibold text-gray-700 mb-2">
				Итого по упражнению
			</Text>

			<View className="bg-gray-50 border border-gray-200 rounded-xl p-3">
				<View className="flex-row justify-between mb-1">
					<Text className="text-sm text-gray-600">Повторений</Text>
					<Text className="text-sm font-medium text-gray-800">{totalReps}</Text>
				</View>

				<View className="flex-row justify-between">
					<Text className="text-sm text-gray-600">Тоннаж</Text>
					<Text className="text-sm font-medium text-gray-800">
						{totalWeight.toFixed(1)} кг
					</Text>
				</View>
			</View>
		</View>
	);
}
