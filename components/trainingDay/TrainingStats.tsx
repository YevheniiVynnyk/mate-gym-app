import React from "react";
import {Text, View} from "react-native";

export default function TrainingStats({trainingDay}: { trainingDay: any }) {
    const totals = calcTotals(trainingDay);
    return (
        <View className="bg-white rounded-2xl p-4">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
                Итоги тренировки
            </Text>

            <View className="flex-row justify-between">
                <StatTile label="Повторения" value={totals.totalReps}/>
                <StatTile label="Тоннаж" value={`${totals.totalWeight.toFixed(0)} кг`}/>
                <StatTile label="Упражнений" value={trainingDay.trainings.length}/>
            </View>
        </View>
    );
}

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
/** Вложенный компонент плитки статистики */
const StatTile = ({
                      label,
                      value,
                  }: {
    label: string;
    value: string | number;
}) => (
    <View className="flex-1 bg-gray-100 mx-1 p-3 rounded-xl items-center justify-center">
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text className="text-lg font-bold text-gray-800">{value}</Text>
    </View>
);
