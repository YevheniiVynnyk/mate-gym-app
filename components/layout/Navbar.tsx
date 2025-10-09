import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Navbar = () => {
	const router = useRouter();

	return (
		<View className="h-20 flex-row items-center justify-between px-4 bg-white shadow-black shadow-2xl">
			{/* Логотип и название */}
			<TouchableOpacity
				onPress={() => router.push("/dashboard")}
				className="flex-row items-center"
			>
				<Image
					source={require("../../assets/images/logo-3.png")}
					className="w-12 h-12 mr-2 rounded-2xl"
				/>
				<Text className="text-2xl font-bold text-primary shadow-2xl">Mate Gym</Text>
			</TouchableOpacity>

			<View className="flex-row items-center justify-center">
				<TouchableOpacity onPress={() => router.push("/developerSupport")} className="mx-2">
					<FontAwesome5 name="heart" size={22} color="red" />
				</TouchableOpacity>

				<TouchableOpacity className="mx-2">
					<Feather name="bell" size={22} color="gray" />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => router.push("/profile")} className="mx-2">
					<Image
						source={require("../../assets/images/logo-3.png")}
						className="w-14 h-14 rounded-full shadow-2xl"
					/>
				</TouchableOpacity>
			</View>

		</View>
	);
};

export default Navbar;
