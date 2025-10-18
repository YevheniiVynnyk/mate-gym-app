import React from "react";
import {Text, View} from "react-native";
import ExerciseTotal from "@/components/trainingDay/ExerciseTotal";

export default function ExerciseCard({training, index}: { training: any; index: number }) {
    const totalReps = training.trainingDetails.reduce((s: number, set: any) => s + set.repetition, 0);
    const totalWeight = training.trainingDetails.reduce(
        (s: number, set: any) => s + set.repetition * set.weight,
        0
    );

    return (
        <View className="p-1 rounded-lg mb-2">
            <Text className="text-md font-bold">
                {index + 1}. {training.exercise.name}
            </Text>
            <Text className="text-sm text-gray-600 text-right">
                {training.trainingDetails.length} подходов
            </Text>

            {training.trainingDetails.map((set: any, i: number) => (
                <View key={i} className="flex-row justify-between m-1 p-1 px-2 bg-gray-100 border border-gray-100 rounded-lg">
                    <Text className="font-medium">Подход {i + 1}</Text>
                    <View className="flex-row items-center space-x-1">
                        <Text>{set.repetition}</Text>
                        {set.weight > 0 && (
                            <>
                                <Text className="text-gray-500"> × </Text>
                                <Text>{set.weight} кг</Text>
                            </>
                        )}
                    </View>
                </View>
            ))}

            {training.note && (
                <View className="bg-gray-200 p-2 rounded-lg mt-2">
                    <Text className="font-bold mb-1">Заметки:</Text>
                    <Text>{training.note}</Text>
                </View>
            )}

           <ExerciseTotal training={training} />
        </View>
    );
}
