import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TrainingExerciseCard } from "@/components/trainingDay/TrainingExerciseCard";

interface Props {
    trainings: any[];
    addTraining: () => void;
    removeTraining: (id: number) => void;
    updateExerciseById: (id: number, ex: any) => void;
    updateNotesById: (id: number, v: string) => void;
    updateSetDataById: (id: number, a: any, b: any, c: any) => void;
    updateSetsById: (id: number, n: number) => void;
}

export const ExerciseListSection = ({
                                        trainings,
                                        addTraining,
                                        removeTraining,
                                        updateExerciseById,
                                        updateNotesById,
                                        updateSetDataById,
                                        updateSetsById,
                                    }: Props) => (
    <View className="bg-white p-4 rounded-xl mb-2">
        {trainings.map((t, i) => (
            <TrainingExerciseCard
                key={t.id}
                training={t}
                index={i}
                onExerciseChange={(ex) => updateExerciseById(t.id, ex)}
                onExerciseSelect={(ex) => updateExerciseById(t.id, ex)}
                onNoteChange={(v) => updateNotesById(t.id, v)}
                onSetDataChange={(a, b, c) => updateSetDataById(t.id, a, b, c)}
                onSetsChange={(n) => updateSetsById(t.id, n)}
                onRemove={() => removeTraining(t.id)}
            />
        ))}

        <TouchableOpacity
            onPress={addTraining}
            className="bg-green-500 py-3 rounded-lg items-center my-2"
        >
            <Text className="text-white font-bold">+ Добавить упражнение</Text>
        </TouchableOpacity>
    </View>
);
