import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";

const languages = [
	{code: "en", label: "English"},
	{code: "ru", label: "Русский"},
	{code: "uk", label: "Українська"},
];

export default function LanguageSelector() {
	const [selectedLanguage, setSelectedLanguage] = useState("ru");

	const changeLanguage = (code: string) => {
		setSelectedLanguage(code);
		// TODO: Добавить логику изменения языка приложения
	};

	return (
		<View className="flex-row flex-wrap my-2">
			{languages.map((lang) => (
				<TouchableOpacity
					key={lang.code}
					className={`px-4 py-2 m-1 border rounded-lg ${
						selectedLanguage === lang.code
							? "bg-blue-600 border-blue-600"
							: "border-blue-600"
					}`}
					onPress={() => changeLanguage(lang.code)}
				>
					<Text
						className={`${
							selectedLanguage === lang.code
								? "text-white"
								: "text-blue-600"
						}`}
					>
						{lang.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
