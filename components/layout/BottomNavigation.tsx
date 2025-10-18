import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {usePathname} from "expo-router";
import {useNavigation} from "@/hooks/useNavigation";

type NavItem = {
	label: string;
	icon: keyof typeof Feather.glyphMap;
	path: () => void;
	route: string; // 👈 добавляем реальный путь для сравнения активного состояния
	activeColor: string;
	activeBg: string;
	description: string;
};

export default function BottomNavigation() {
	const router = useNavigation();
	const pathname = usePathname();

	const navItems: NavItem[] = [
		{
			label: "Главная",
			icon: "home",
			path: router.toDashboard,
			route: "/dashboard",
			activeColor: "#22C55E",
			activeBg: "#DCFCE7",
			description: "спокойствие, дом, стабильность",
		},
		{
			label: "Тренировки",
			icon: "calendar",
			path: router.toTrainingList,
			route: "/trainingDay/trainingDayView",
			activeColor: "#22C55E",
			activeBg: "#DCFCE7",
			description: "энергия, здоровье, активность",
		},
		{
			label: "Прогресс",
			icon: "trending-up",
			path: router.toProgress,
			route: "/progress",
			activeColor: "#22C55E",
			activeBg: "#DCFCE7",
			description: "рост, успех, развитие",
		},
		{
			label: "Планы",
			icon: "shopping-cart",
			path: router.toTrainingPlan,
			route: "/trainingPlans",
			activeColor: "#22C55E",
			activeBg: "#DCFCE7",
			description: "ясность, структура, планирование",
		},
	];

	return (
		<View className="flex-row justify-between items-center p-2 rounded-t-2xl">
			{navItems.map(({label, icon, path, route, activeColor, activeBg}, index) => {
				const isActive =
					pathname === route ||
					((!pathname || pathname === "/app") && index === 0);

				return (
					<TouchableOpacity
						key={route}
						className="flex-1 m-1 p-3 rounded-2xl items-center justify-center border border-gray-100"
						style={{
							backgroundColor: isActive ? activeBg : "#FFF",
						}}
						activeOpacity={0.85}
						onPress={path}
					>
						<Feather
							name={icon}
							size={22}
							color={isActive ? activeColor : "#000"}
						/>
						<Text
							className={`text-xs mt-1 ${
								isActive ? "font-semibold" : ""
							}`}
							style={{
								color: isActive ? activeColor : "#000",
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