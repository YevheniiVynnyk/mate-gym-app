import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import ExerciseSearchSelect from "./ExerciseSearchSelect";
import SetInputs from "./SetInputs";
import {Training} from "@/types/trainingDay";
import {X} from "lucide-react-native";
import ExerciseTotal from "@/components/trainingDay/ExerciseTotal";

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
	return (
		<View className="p-2 mb-4 border border-gray-200 rounded-2xl">
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

			<ExerciseTotal training={training}/>
		</View>
	);
};