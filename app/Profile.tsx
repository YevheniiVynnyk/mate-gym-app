import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Camera, Edit3, Save, User} from "lucide-react-native";
import {useAuth} from "@/contexts/AuthContext";
import {UserDTO, userService} from "@/services/userService";
import {BodyDTO, bodyService} from "@/services/bodyService";
import {fromUserDTO} from "@/services/mapper/userMapper";
import * as ImagePicker from "expo-image-picker";
import LanguageSelector from "@/components/profile/LanguageSelector";
import ThemeSelector from "@/components/profile/ThemeSelector";
import PrivacyDialog from "@/components/profile/PrivacyDialog";
import {imageService} from "@/services/imageService";
import {useRouter} from "expo-router";

type UserFormData = {
	firstName?: string;
	lastName?: string;
	email: string;
	login: string;
	phoneNumber?: string;
	age?: number;
	goals?: string;
	status?: string;
	role: string;
	trainerId?: string;
};

export default function ProfilePage() {
	const {user, logout, setUser} = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingPhys, setIsEditingPhys] = useState(false);
	const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
	const [body, setBody] = useState<BodyDTO | null>(null);
	const [avatarUri, setAvatarUri] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const [formDataUser, setFormDataUser] = useState<UserFormData>({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		login: user?.login || "",
		phoneNumber: user?.phoneNumber || "",
		age: user?.age || 0,
		goals: (user as any)?.goals || "",
		status: (user as any)?.status || "",
		role: user?.role || "",
		trainerId: (user as any)?.trainerId?.toString() || "",
	});

	const router = useRouter();

	useEffect(() => {
		const fetchBody = async () => {
			if (!user) return;
			try {
				const data = await bodyService.getCurrentBodyRecord();
				setBody(data);
			} catch (error) {
				console.error("Ошибка при загрузке данных:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchBody();
	}, []);

	const handleSave = async () => {
		if (!user) return;
		try {
			const updatedUser: UserDTO = {
				...user,
				firstName: formDataUser.firstName,
				lastName: formDataUser.lastName,
				email: formDataUser.email,
				login: formDataUser.login,
				phoneNumber: formDataUser.phoneNumber,
				age: Number(formDataUser.age),
			};
			await userService.updateUser(updatedUser);
			setIsEditing(false);
			setUser(fromUserDTO(updatedUser));
		} catch (error) {
			console.error(error);
		}
	};

	const handleSavePhys = async () => {
		if (!user || !body) return;
		try {
			const inputDate = new Date(body.date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			await bodyService.createBodyRecord({
				height: Number(body.height),
				weight: Number(body.weight),
				date: inputDate,
			});

			setIsEditingPhys(false);
			const latestBody = await bodyService.getCurrentBodyRecord();
			setBody(inputDate < today ? latestBody : body);
		} catch (error) {
			console.error(error);
		}
	};

	const pickAvatar = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.7,
		});
		if (!result.canceled) {
			const uri = result.assets?.[0]?.uri;
			if (uri) {
				setAvatarUri(uri);
				try {
					const uploaded = await imageService.upload(uri);
					setUser((prev) => (prev ? {...prev, imageId: uploaded} : prev));
				} catch (err) {
					console.error(err);
				}
			}
		}
	};

	const handleLogout = async () => {
		await logout();
		router.replace("/");
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#007AFF"/>
				<Text className="mt-2 text-gray-700">Загрузка...</Text>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-gray-50 p-4">
			{/* Header */}
			<View className="flex-row items-center mb-4">
				<User size={28} color="#007AFF"/>
				<Text className="text-2xl font-bold ml-2">Профиль</Text>
			</View>

			{/* Фото профиля */}
			<View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
				<Text className="text-lg font-semibold mb-2">Фото профиля</Text>
				<TouchableOpacity onPress={pickAvatar} className="items-center relative">
					{avatarUri ? (
						<Image source={{uri: avatarUri}} className="w-24 h-24 rounded-full"/>
					) : (
						<User size={60} color="#ccc"/>
					)}
					<Camera size={20} className="absolute bottom-0 right-1" color="#007AFF"/>
				</TouchableOpacity>
			</View>

			{/* Личная информация */}
			<View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
				<View className="flex-row justify-between items-center mb-2">
					<Text className="text-lg font-semibold">Личная информация</Text>
					<TouchableOpacity
						className="flex-row items-center"
						onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
					>
						{isEditing ? <Save size={18}/> : <Edit3 size={18}/>}
						<Text className="ml-1 text-blue-500">
							{isEditing ? "Сохранить" : "Редактировать"}
						</Text>
					</TouchableOpacity>
				</View>

				{[
					{placeholder: "Имя", key: "firstName"},
					{placeholder: "Фамилия", key: "lastName"},
					{placeholder: "Email", key: "email", keyboardType: "email-address"},
					{placeholder: "Логин", key: "login"},
					{placeholder: "Телефон", key: "phoneNumber", keyboardType: "phone-pad"},
					{placeholder: "Возраст", key: "age", keyboardType: "numeric"},
				].map((item) => (
					<TextInput
						key={item.key}
						className="border border-gray-300 rounded-md p-2 mb-2"
						placeholder={item.placeholder}
						value={String((formDataUser as any)[item.key] || "")}
						editable={isEditing}
						keyboardType={item.keyboardType as any}
						onChangeText={(text) =>
							setFormDataUser((prev) => ({
								...prev,
								[item.key]:
									item.key === "age" ? Number(text) : text,
							}))
						}
					/>
				))}

				{formDataUser.role === "CLIENT" && (
					<TextInput
						className="border border-gray-300 rounded-md p-2 mb-2"
						placeholder="Цели"
						value={formDataUser.goals}
						editable={isEditing}
						onChangeText={(text) => setFormDataUser({...formDataUser, goals: text})}
					/>
				)}
			</View>

			{/* Физические показатели */}
			<View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
				<View className="flex-row justify-between items-center mb-2">
					<Text className="text-lg font-semibold">Физические показатели</Text>
					<TouchableOpacity
						className="flex-row items-center"
						onPress={() => (isEditingPhys ? handleSavePhys() : setIsEditingPhys(true))}
					>
						{isEditingPhys ? <Save size={18}/> : <Edit3 size={18}/>}
						<Text className="ml-1 text-blue-500">
							{isEditingPhys ? "Сохранить" : "Редактировать"}
						</Text>
					</TouchableOpacity>
				</View>

				<TextInput
					className="border border-gray-300 rounded-md p-2 mb-2"
					placeholder="Рост (см)"
					value={body?.height?.toString() || ""}
					editable={isEditingPhys}
					keyboardType="numeric"
					onChangeText={(text) => setBody({...body, height: Number(text)})}
				/>
				<TextInput
					className="border border-gray-300 rounded-md p-2 mb-2"
					placeholder="Вес (кг)"
					value={body?.weight?.toString() || ""}
					editable={isEditingPhys}
					keyboardType="numeric"
					onChangeText={(text) => setBody({...body, weight: Number(text)})}
				/>
				<TextInput
					className="border border-gray-300 rounded-md p-2"
					placeholder="BMI"
					value={body?.bmi?.toString() || ""}
					editable={false}
				/>
			</View>

			{/* Настройки */}
			<View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
				<Text className="text-lg font-semibold mb-2">Настройки и действия</Text>
				<LanguageSelector/>
				<ThemeSelector/>
				<TouchableOpacity
					className="bg-red-500 py-2 rounded-md mt-3 items-center"
					onPress={handleLogout}
				>
					<Text className="text-white font-bold">Выйти</Text>
				</TouchableOpacity>
			</View>

			<PrivacyDialog
				open={isPrivacyDialogOpen}
				onClose={() => setIsPrivacyDialogOpen(false)}
			/>
		</ScrollView>
	);
}
