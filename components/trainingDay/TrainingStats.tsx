import React from "react";
import {Text, View} from "react-native";

const calcTotals = (trainingDay: any) => {
	let totalReps = 0;
	let totalWeight = 0;
	trainingDay.trainings.forEach((t: any) => {
		t.trainingDetails.forEach((set: any) => {
			totalReps += set.repetition;
			totalWeight += set.repetition * set.weight;
		});
	});
	return {totalReps, totalWeight};
};

export default function TrainingStats({trainingDay}: {trainingDay: any}) {
	const totals = calcTotals(trainingDay);
	return (
		<View className="mt-4 mb-4">
			<Text className="text-base mb-1">Общие повторения: {totals.totalReps}</Text>
			<Text className="text-base mb-1">
				Общий тоннаж: {totals.totalWeight.toFixed(0)} кг
			</Text>
			<Text className="text-base">Упражнений: {trainingDay.trainings.length}</Text>
		</View>
	);
}
