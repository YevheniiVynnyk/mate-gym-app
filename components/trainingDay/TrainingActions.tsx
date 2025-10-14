import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Play, StopCircle, Trash2} from "lucide-react-native";

interface Props {
	isStarted: boolean;
	status: string;
	onStart: () => void;
	onFinish: () => void;
	onDelete: () => void;
}

export default function TrainingActions({isStarted, status, onStart, onFinish, onDelete}: Props) {
	return (
		<View className="flex-row space-x-2 mb-4">
			{!isStarted && status !== "COMPLETED" && (
				<TouchableOpacity
					className="flex-row items-center bg-green-600 px-3 py-2 rounded-lg"
					onPress={onStart}>
					<Play size={16} color="#fff" />
					<Text className="text-white font-bold ml-2">Начать</Text>
				</TouchableOpacity>
			)}
			{isStarted && (
				<TouchableOpacity
					className="flex-row items-center bg-red-600 px-3 py-2 rounded-lg"
					onPress={onFinish}>
					<StopCircle size={16} color="#fff" />
					<Text className="text-white font-bold ml-2">Завершить</Text>
				</TouchableOpacity>
			)}
			<TouchableOpacity
				className="flex-row items-center bg-gray-500 px-3 py-2 rounded-lg"
				onPress={onDelete}>
				<Trash2 size={16} color="#fff" />
				<Text className="text-white font-bold ml-2">Удалить</Text>
			</TouchableOpacity>
		</View>
	);
}
