import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export const Header = ({onBack, title}: {onBack: () => void; title: string}) => (
	<View className="flex-row items-center mb-4">
		<TouchableOpacity onPress={onBack}>
			<Text className="text-blue-500 font-medium">Назад</Text>
		</TouchableOpacity>
		<Text className="text-xl font-bold ml-2">{title}</Text>
	</View>
);
