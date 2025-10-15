import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useAuth} from "@/contexts/AuthContext";
import TrainingHeader from "@/components/trainingDay/TrainingHeader";
import TrainingTimer from "@/components/trainingDay/TrainingTimer";
import TrainingActions from "@/components/trainingDay/TrainingActions";
import TrainingStats from "@/components/trainingDay/TrainingStats";
import ExerciseCard from "@/components/trainingDay/ExerciseCard";
import {useTrainingDay} from "@/hooks/useTrainingDay";
import {useNavigation} from "@/hooks/useNavigation";

export default function Id() {
    const router = useNavigation();
    const {id} = useLocalSearchParams(); // получаем id из URL
    const {user} = useAuth();
    const {trainingDay, isStarted, time, start, finish, remove} = useTrainingDay(Number(id), user?.id);

    if (!trainingDay) {
        return (
            <View className="flex-1 bg-white p-4">
                <Text className="text-lg text-center mt-6">Тренировка не найдена</Text>
                <TouchableOpacity
                    className="bg-blue-500 p-3 rounded-lg mt-4"
                    onPress={() => router.goBack()}
                >
                    <Text className="text-white font-bold">Назад</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <TrainingHeader title={trainingDay.name} onBack={() => router.goBack()}/>

            {isStarted && <TrainingTimer time={time}/>}

            <TrainingActions
                isStarted={isStarted}
                status={trainingDay.status}
                onStart={start}
                onFinish={finish}
                onDelete={async () => {
                    await remove();
                    router.goBack();
                }}
            />

            <TrainingStats trainingDay={trainingDay}/>

            {trainingDay.trainings.map((training: any, i: number) => (
                <ExerciseCard key={training.id} index={i} training={training}/>
            ))}
        </ScrollView>
    );
}