import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useAuth} from "@/contexts/AuthContext";
import TrainingHeader from "@/components/trainingDay/TrainingHeader";
import TrainingTimer from "@/components/trainingDay/TrainingTimer";
import TrainingActions from "@/components/trainingDay/TrainingActions";
import TrainingStats from "@/components/trainingDay/TrainingStats";
import ExerciseCard from "@/components/trainingDay/ExerciseCard";
import {useTrainingDay} from "@/hooks/useTrainingDay";

export default function TrainingDayDetail() {
	const navigation = useNavigation();
	const route = useRoute();
	const {id} = route.params as { id: number };
	const {user} = useAuth();
	const {trainingDay, isStarted, time, start, finish, remove} = useTrainingDay(id, user?.id);

	if (!trainingDay) {
		return (
			<View className="flex-1 bg-white p-4">
				<Text className="text-lg text-center mt-6">Тренировка не найдена</Text>
				<TouchableOpacity
					className="bg-blue-500 p-3 rounded-lg mt-4"
					onPress={() => navigation.goBack()}>
					<Text className="text-white font-bold">Назад</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-white p-4">
			<TrainingHeader title={trainingDay.name} onBack={() => navigation.goBack()}/>

			{isStarted && <TrainingTimer time={time}/>}

			<TrainingActions
				isStarted={isStarted}
				status={trainingDay.status}
				onStart={start}
				onFinish={finish}
				onDelete={async () => {
					await remove();
					navigation.goBack();
				}}
			/>

			<TrainingStats trainingDay={trainingDay}/>

			{trainingDay.trainings.map((training: any, i: number) => (
				<ExerciseCard key={training.id} index={i} training={training}/>
			))}
		</ScrollView>
	);
}