import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export const Header = ({onBack, title}: { onBack: () => void; title: string }) => (
	<View className="flex-row items-center justify-between mb-4">
		<TouchableOpacity
			onPress={onBack}
			className="bg-white rounded-xl px-4 py-2 border border-gray-200 flex-row items-center justify-center      "
		>
			<Text className="text-gray-600 font-medium">Назад</Text>
		</TouchableOpacity>
		<Text className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
			{title}
		</Text>
	</View>
);
