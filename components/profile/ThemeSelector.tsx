import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";

const themes = [
	{code: "light", label: "Светлая"},
	{code: "dark", label: "Тёмная"},
];

export default function ThemeSelector() {
	const [selectedTheme, setSelectedTheme] = useState("light");

	const changeTheme = (code: string) => {
		setSelectedTheme(code);
		// TODO: Добавить логику изменения темы приложения
	};

	return (
		<View className="flex-row flex-wrap my-2">
			{themes.map((theme) => (
				<TouchableOpacity
					key={theme.code}
					className={`p-2 m-1 border rounded-md border-blue-500 ${
						selectedTheme === theme.code ? "bg-blue-500" : ""
					}`}
					onPress={() => changeTheme(theme.code)}
				>
					<Text
						className={`${
							selectedTheme === theme.code ? "text-white" : "text-blue-500"
						}`}
					>
						{theme.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
