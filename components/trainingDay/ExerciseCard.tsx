import React from "react";
import {Text, View} from "react-native";

export default function ExerciseCard({training, index}: {training: any; index: number}) {
	const totalReps = training.trainingDetails.reduce((s: number, set: any) => s + set.repetition, 0);
	const totalWeight = training.trainingDetails.reduce(
		(s: number, set: any) => s + set.repetition * set.weight,
		0
	);

	return (
		<View className="bg-gray-100 p-3 rounded-lg mb-4">
			<Text className="text-base font-bold">
				{index + 1}. {training.exercise.name}
			</Text>
			<Text className="text-sm text-gray-600">
				{training.trainingDetails.length} подходов
			</Text>

			{training.trainingDetails.map((set: any, i: number) => (
				<View key={i} className="flex-row justify-between py-1">
					<Text className="font-medium">Подход {i + 1}</Text>
					<View className="flex-row space-x-2">
						<Text>{set.repetition} повторов</Text>
						{set.weight > 0 && <Text>{set.weight} кг</Text>}
					</View>
				</View>
			))}

			{training.note && (
				<View className="bg-gray-200 p-2 rounded-lg mt-2">
					<Text className="font-bold mb-1">Заметки:</Text>
					<Text>{training.note}</Text>
				</View>
			)}

			<View className="bg-gray-300 p-2 rounded-lg mt-2">
				<Text>Всего повторений: {totalReps}</Text>
				<Text>Тоннаж: {totalWeight.toFixed(1)} кг</Text>
			</View>
		</View>
	);
}
