import React from "react";
import {Text, View} from "react-native";
import {Clock} from "lucide-react-native";
import {formatTime} from "@/hooks/useTrainingDay";

export default function TrainingTimer({time}: { time: number }) {
	return (
		<View className="flex-row items-center p-3 bg-blue-50 rounded-lg mb-4">
			<Clock size={20} color="#007AFF"/>
			<Text className="ml-2 text-lg">{formatTime(time)}</Text>
		</View>
	);
}
