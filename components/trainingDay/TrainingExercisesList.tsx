import React from "react";
import {ScrollView, View} from "react-native";
import ExerciseCard from "@/components/trainingDay/ExerciseCard";

interface Props {
	trainingDay: any;
}

export default function TrainingExercisesList({trainingDay}: Props) {
	return (
		<ScrollView
			className="bg-white p-2 my-2 rounded-2xl"
			showsVerticalScrollIndicator={false}
		>
			{trainingDay.trainings.map((training: any, i: number) => (
				<View
					key={training.id}
					className="rounded-xl p-2 mb-4 border border-gray-100 "
				>
					<ExerciseCard index={i} training={training}/>
				</View>
			))}
		</ScrollView>
	)
		;
}