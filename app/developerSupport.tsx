import React from "react";
import {Alert, Image, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import * as Clipboard from "expo-clipboard";
import {Feather, FontAwesome5} from "@expo/vector-icons";

const supportOptions = [
	{
		title: "Карта Сбербанка",
		description: "Поддержка через российскую карту",
		number: "2202 2063 1234 5678",
		icon: <FontAwesome5 name="credit-card" size={20} color="#38a169"/>,
		color: "bg-[#e6fffa]",
	},
	{
		title: "Ethereum (ETH)",
		description: "Криптовалютная поддержка",
		number: "0x742d35cc6644c30532e6ce98f59a87093c7b4325",
		icon: <FontAwesome5 name="ethereum" size={20} color="#3182ce"/>,
		color: "bg-[#ebf8ff]",
	},
	{
		title: "Bitcoin (BTC)",
		description: "Биткоин поддержка",
		number: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
		icon: <FontAwesome5 name="bitcoin" size={20} color="#dd6b20"/>,
		color: "bg-[#fffaf0]",
	},
	{
		title: "TON Coin",
		description: "TON блокчейн",
		number: "UQD3FlatJI8UQx2oUSs3qMBl9LN8VBwueDUJ89JqHDWt7t8e",
		icon: <FontAwesome5 name="coins" size={20} color="#805ad5"/>,
		color: "bg-[#faf5ff]",
	},
];

const DeveloperSupport = () => {
	const copyToClipboard = async (text: string, type: string) => {
		await Clipboard.setStringAsync(text);
		Alert.alert("Скопировано", `${type} скопирован: ${text}`);
	};

	return (
		<ScrollView className="flex-1 bg-white p-4">
			{/* Заголовок */}
			<View className="items-center mb-5">
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
					}}
					className="w-24 h-24 rounded-full mb-2.5"
				/>
				<Text className="text-xl font-bold">Поддержать разработчика</Text>
				<Text className="text-center text-gray-500 my-2">
					Если вам нравится приложение Mate Gym и вы хотите поддержать его развитие, вы можете
					это сделать любым удобным способом.
				</Text>
				<View className="flex-row items-center mt-1.5">
					<Feather name="heart" size={20} color="red"/>
					<Text className="mx-2 text-gray-500">Сделано с любовью</Text>
					<FontAwesome5 name="coffee" size={20} color="#d69e2e"/>
				</View>
			</View>

			{/* Информация о разработчике */}
			<View className="bg-gray-50 p-4 rounded-xl my-2">
				<View className="flex-row items-center mb-2">
					<FontAwesome5 name="github" size={20} color="#000"/>
					<Text className="ml-2 text-lg font-bold">О разработчике</Text>
				</View>

				<View className="mt-1">
					<View className="flex-row items-center mb-1.5">
						<Feather name="mail" size={16} color="gray"/>
						<Text className="ml-2 text-gray-600">developer@mategym.ru</Text>
					</View>
					<View className="flex-row items-center mb-1.5">
						<Feather name="phone" size={16} color="gray"/>
						<Text className="ml-2 text-gray-600">+7 (999) 123-45-67</Text>
					</View>
					<View className="flex-row items-center mb-1.5">
						<Feather name="map-pin" size={16} color="gray"/>
						<Text className="ml-2 text-gray-600">Москва, Россия</Text>
					</View>
				</View>

				<View className="mt-3">
					<Text className="bg-gray-200 px-2 py-1 rounded-md mb-1 w-fit">React Developer</Text>
					<Text className="bg-gray-200 px-2 py-1 rounded-md mb-1 w-fit">TypeScript</Text>
					<Text className="bg-gray-200 px-2 py-1 rounded-md mb-2 w-fit">Mobile Apps</Text>
					<Text className="text-gray-500">
						Специализируюсь на создании современных веб и мобильных приложений. Mate Gym — проект
						для помощи тренерам и клиентам в достижении фитнес-целей.
					</Text>
				</View>
			</View>

			{/* Способы поддержки */}
			{supportOptions.map((option, index) => (
				<View key={index} className={`p-4 rounded-xl my-2 ${option.color}`}>
					<View className="flex-row items-center mb-2">
						{option.icon}
						<Text className="ml-2 text-lg font-bold">{option.title}</Text>
					</View>
					<Text className="text-gray-600 mb-2">{option.description}</Text>
					<View className="mt-1">
						<Text className="font-mono text-sm mb-2">{option.number}</Text>
						<TouchableOpacity
							className="bg-blue-600 py-2 px-3 rounded-md items-center"
							onPress={() => copyToClipboard(option.number, option.title)}
						>
							<Text className="text-white font-bold">Скопировать</Text>
						</TouchableOpacity>
					</View>
				</View>
			))}

			{/* Планы развития */}
			<View className="bg-gray-50 p-4 rounded-xl my-2">
				<Text className="text-lg font-bold mb-1">Планы развития</Text>
				<Text className="text-gray-600">
					• Интеграция с фитнес-трекерами{"\n"}• Видео-упражнения{"\n"}• Планы питания{"\n"}•
					Групповые тренировки
				</Text>
			</View>
		</ScrollView>
	);
};

export default DeveloperSupport;
