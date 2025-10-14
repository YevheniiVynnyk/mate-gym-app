import {Text, View} from "react-native";
import {Clock} from "lucide-react-native";

export default function TrainingTimeSection() {
	return (
		<View className="bg-gray-50 p-4 rounded-xl mb-10">
			<View className="flex-row items-center mb-2">
				<Clock size={20} color="#000"/>
				<Text className="ml-2 text-lg font-bold">Время тренировок</Text>
			</View>
			<Text className="text-center text-gray-500">Данные скоро будут доступны</Text>
		</View>
	);
}