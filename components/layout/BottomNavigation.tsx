import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function BottomNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	const getColor = (path: string) => (pathname === path ? "#007bff" : "gray");

	return (
		<View className="flex-row justify-around p-3 bg-white border-t border-gray-300">
			<TouchableOpacity
				className="items-center"
				onPress={() => router.push("/dashboard")}
			>
				<Feather name="home" size={24} color={getColor("/dashboard")} />
				<Text
					className={`text-xs mt-1 ${pathname === "/dashboard" ? "text-blue-500 font-semibold" : "text-gray-500"}`}
				>
					Главная
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="items-center"
				onPress={() => router.push("/trainingDay/trainingDayView")}
			>
				<Feather name="calendar" size={24} color={getColor("/trainingDay/trainingDayView")} />
				<Text
					className={`text-xs mt-1 ${pathname === "/trainingDay/trainingDayView" ? "text-blue-500 font-semibold" : "text-gray-500"}`}
				>
					Тренировки
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="items-center"
				onPress={() => router.push("/progress")}
			>
				<Feather name="trending-up" size={24} color={getColor("/progress")} />
				<Text
					className={`text-xs mt-1 ${pathname === "/progress" ? "text-blue-500 font-semibold" : "text-gray-500"}`}
				>
					Прогресс
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="items-center"
				onPress={() => router.push("/trainingPlans")}
			>
				<Feather name="shopping-cart" size={24} color={getColor("/trainingPlans")} />
				<Text
					className={`text-xs mt-1 ${pathname === "/trainingPlans" ? "text-blue-500 font-semibold" : "text-gray-500"}`}
				>
					Планы
				</Text>
			</TouchableOpacity>
		</View>
	);
}
