import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

type NavItem = {
	label: string;
	icon: keyof typeof Feather.glyphMap;
	path: string;
	activeColor: string;
	activeBg: string;
	description: string; // для понимания логики
};

// 🎨 Цвета по смыслу:
// - Главная → нейтральная, спокойная (синевато-серая)
// - Тренировки → зелёная, энергия, движение
// - Прогресс → жёлтая/оранжевая, рост, достижения
// - Планы → голубая, ясность, структура
const navItems: NavItem[] = [
	{
		label: "Главная",
		icon: "home",
		path: "/dashboard",
		activeColor: "#22C55E", // зеленый
		activeBg: "#DCFCE7", // светло-зеленый
		description: "спокойствие, дом, стабильность",
	},
	{
		label: "Тренировки",
		icon: "calendar",
		path: "/trainingDay/trainingDayView",
		activeColor: "#22C55E", // зеленый
		activeBg: "#DCFCE7", // светло-зеленый
		description: "энергия, здоровье, активность",
	},
	{
		label: "Прогресс",
		icon: "trending-up",
		path: "/progress",
		activeColor: "#22C55E", // зеленый
		activeBg: "#DCFCE7", // светло-зеленый
		description: "рост, успех, развитие",
	},
	{
		label: "Планы",
		icon: "shopping-cart",
		path: "/trainingPlans",
		activeColor: "#22C55E", // зеленый
		activeBg: "#DCFCE7", // светло-зеленый
		description: "ясность, структура, планирование",
	},
];

export default function BottomNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<View className="flex-row justify-between items-center bg-white rounded-2xl m-2 p-2">
			{navItems.map(({ label, icon, path, activeColor, activeBg }) => {
				const isActive = pathname === path;

				return (
					<TouchableOpacity
						key={path}
						className="flex-1 items-center justify-center rounded-2xl py-2"
						style={{
							backgroundColor: isActive ? activeBg : "transparent",
						}}
						activeOpacity={0.85}
						onPress={() => router.push(path)}
					>
						<Feather
							name={icon}
							size={24}
							color={isActive ? activeColor : "#9CA3AF"}
						/>
						<Text
							className={`text-xs mt-1 ${isActive ? "font-semibold" : ""}`}
							style={{
								color: isActive ? activeColor : "#9CA3AF",
							}}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>

	);
}
