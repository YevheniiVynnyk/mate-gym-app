import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft} from "lucide-react-native";

export default function TrainingHeader({title, onBack}: {title: string; onBack: () => void}) {
	return (
		<View className="flex-row justify-between items-center mb-4">
			<TouchableOpacity onPress={onBack} className="flex-row items-center">
				<ArrowLeft size={20} />
				<Text className="ml-1 text-blue-500">Назад</Text>
			</TouchableOpacity>
			<Text className="text-xl font-bold">{title}</Text>
		</View>
	);
}
