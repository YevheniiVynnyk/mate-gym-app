import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export const Header = ({onBack, title}: {onBack: () => void; title: string}) => (
	<View className="flex-row items-center justify-between mb-4">
		<TouchableOpacity onPress={onBack}>
			<Text className="text-blue-500 font-medium">Назад</Text>
		</TouchableOpacity>

		<Text className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
			{title}
		</Text>

		{/* Пустой элемент справа для симметрии */}
		<View style={{ width: 60 }} />
	</View>
);
