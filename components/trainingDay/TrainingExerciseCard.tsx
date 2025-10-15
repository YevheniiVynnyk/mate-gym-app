import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import ExerciseSearchSelect from "./ExerciseSearchSelect";
import SetInputs from "./SetInputs";
import {calculateTotals} from "@/lib/utils";
import {Training} from "@/types/trainingDay";
import {X} from "lucide-react-native";

export const TrainingExerciseCard = ({
                                         key,
                                         training,
                                         index,
                                         onExerciseChange,
                                         onExerciseSelect,
                                         onNoteChange,
                                         onSetDataChange,
                                         onSetsChange,
                                         onRemove
                                     }: {
    key: number;
    training: Training;
    index: number;
    onExerciseChange: (val: string) => void;
    onExerciseSelect: (ex: any) => void;
    onNoteChange: (val: string) => void;
    onSetDataChange: (i: number, f: "weight" | "repetition", v: number) => void;
    onSetsChange: (count: number) => void;
    onRemove: () => void;
}) => {
    const totals = calculateTotals(training.trainingDetails);

    return (
        <View className="p-2 mb-3 border border-gray-200 rounded-2xl">
            <View className="flex-row align-items-center justify-between">
                <Text className="text-lg font-medium p-2">Упражнение {index + 1}</Text>
                <TouchableOpacity onPress={onRemove} className="p-2">
                    <X size={25} color="red"/>
                </TouchableOpacity>
            </View>

            <ExerciseSearchSelect
                value={training.exercise.name}
                onChange={onExerciseChange}
                onExerciseSelect={onExerciseSelect}
            />

            <SetInputs
                sets={training.trainingDetails.length}
                setData={training.trainingDetails}
                onSetDataChange={onSetDataChange}
                onSetsChange={onSetsChange}
            />

            <TextInput
                placeholder="Заметки"
                multiline
                value={training.note || ""}
                onChangeText={onNoteChange}
                className="border border-gray-300 rounded-lg p-3 bg-gray-100"
            />

            <View className="flex">
                <Text className="mt-2 text-sm font-medium text-gray-700">
                    Итого по упражнению:
                </Text>
                <View className="my-1 p-3 border border-gray-200 rounded-lg">
                    <Text className="text-sm font-medium text-gray-500">Общее количество
                        повторений: {totals.totalReps}</Text>
                    <Text className="text-sm font-medium text-gray-500">Общий
                        тоннаж: {totals.totalWeight.toFixed(1)} кг</Text>
                </View>
            </View>
        </View>
    );
};