import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { TrainingDetail } from "@/types/trainingDay";

interface SetInputsProps {
	sets: number;
	setData: TrainingDetail[];
	onSetDataChange: (index: number, field: "weight" | "repetition", value: number) => void;
	onSetsChange?: (newSetsCount: number) => void;
}

const SetInputs: React.FC<SetInputsProps> = ({
												 sets,
												 setData,
												 onSetDataChange,
												 onSetsChange
											 }) => {
	const handleSetsChange = (newSetsCount: number) => {
		if (newSetsCount >= 1 && newSetsCount <= 10 && onSetsChange) {
			onSetsChange(newSetsCount);
		}
	};

	return (
		<View className="p-2">
			<View className="flex-row justify-between items-center mb-2">
				<Text className="font-bold">Подходы</Text>
				{onSetsChange && (
					<View className="flex-row items-center">
						<TouchableOpacity
							onPress={() => handleSetsChange(sets - 1)}
							disabled={sets <= 1}
							className="p-1"
						>
							<Minus size={16} />
						</TouchableOpacity>
						<Text className="mx-2">{sets}</Text>
						<TouchableOpacity
							onPress={() => handleSetsChange(sets + 1)}
							disabled={sets >= 10}
							className="p-1"
						>
							<Plus size={16} />
						</TouchableOpacity>
					</View>
				)}
			</View>

			{Array.from({ length: sets }).map((_, index) => (
				<View
					key={index}
					className="my-1 p-3 border border-gray-300 rounded-lg"
				>
					<View className="flex-row items-center">
						<Text className="font-bold w-6">{index + 1}</Text>
						<View className="flex-row flex-1">
							<View className="flex-1 mx-1">
								<Text className="text-xs">Повторения</Text>
								<TextInput
									className="border border-gray-300 rounded p-1"
									keyboardType="number-pad"
									value={setData[index]?.repetition?.toString() ?? ""}
									onChangeText={(val) =>
										onSetDataChange(index, "repetition", val === "" ? 0 : parseInt(val, 10))
									}
								/>
							</View>
							<View className="flex-1 mx-1">
								<Text className="text-xs">Вес (кг)</Text>
								<TextInput
									className="border border-gray-300 rounded p-1"
									keyboardType="decimal-pad"
									value={setData[index]?.weight?.toString() ?? ""}
									onChangeText={(val) => {
										if (val === "") {
											onSetDataChange(index, "weight", 0);
											return;
										}
										const num = parseFloat(val);
										if (!isNaN(num)) onSetDataChange(index, "weight", num);
									}}
								/>
							</View>
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

export default SetInputs;
