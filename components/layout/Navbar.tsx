import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Navbar = () => {
	const router = useRouter();

	return (
		<View className="h-16 flex-row items-center justify-between px-3 bg-white border-b border-gray-300">
			{/* Логотип и название */}
			<TouchableOpacity
				onPress={() => router.push("/dashboard")}
				className="flex-row items-center"
			>
				<Image
					source={require("../../assets/logo-2.png")}
					className="w-8 h-8 mr-2"
				/>
				<Text className="text-xl font-bold text-green-500">Mate Gym</Text>
			</TouchableOpacity>

			{/* Иконки */}
			<View className="flex-row items-center space-x-4">
				<TouchableOpacity onPress={() => router.push("/developerSupport")}>
					<FontAwesome5 name="heart" size={20} color="red" />
				</TouchableOpacity>

				<TouchableOpacity>
					<Feather name="bell" size={20} color="gray" />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => router.push("/profile")}>
					<Image
						source={require("../../assets/logo-3.png")}
						className="w-8 h-8 rounded-full"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Navbar;
