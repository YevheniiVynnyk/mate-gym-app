import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import ExerciseSearchSelect from "./ExerciseSearchSelect";
import SetInputs from "./SetInputs";
import {calculateTotals} from "@/lib/utils";
import {Training} from "@/types/trainingDay";

export const TrainingExerciseCard = ({
										 training,
										 index,
										 onExerciseChange,
										 onExerciseSelect,
										 onNoteChange,
										 onSetDataChange,
										 onSetsChange,
										 onRemove
									 }: {
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
		<View className="bg-white p-3 rounded-xl mb-3">
			<Text className="text-lg font-semibold">Упражнение {index + 1}</Text>

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
				className="border border-gray-300 rounded-lg p-2 mt-2 min-h-[60px]"
			/>

			<Text className="mt-2 text-sm text-gray-700">
				Итого: {totals.totalReps} повторений, {totals.totalWeight.toFixed(1)} кг
			</Text>

			<TouchableOpacity onPress={onRemove}>
				<Text className="text-red-500 mt-2 font-medium">Удалить упражнение</Text>
			</TouchableOpacity>
		</View>
	);
};