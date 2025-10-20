import React from "react";
import {Text, TouchableOpacity} from "react-native";

export function ActionCard({
							   icon,
							   label,
							   onPress,
						   }: {
	icon: React.ReactNode;
	label: string;
	onPress: () => void;
}) {
	return (
		<TouchableOpacity
			className="w-[48%] bg-white p-4 rounded-lg items-center mb-2"
			onPress={onPress}
		>
			{icon}
			<Text className="mt-2 font-semibold">{label}</Text>
		</TouchableOpacity>
	);
}