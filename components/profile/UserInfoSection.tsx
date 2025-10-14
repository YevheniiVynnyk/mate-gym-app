import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Edit3, Save} from "lucide-react-native";

export default function UserInfoSection({
											isEditing,
											setIsEditing,
											formDataUser,
											setFormDataUser,
											handleSaveUser,
										}: any) {
	return (
		<View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
			<View className="flex-row justify-between items-center mb-2">
				<Text className="text-lg font-semibold">Личная информация</Text>
				<TouchableOpacity
					className="flex-row items-center"
					onPress={() => (isEditing ? handleSaveUser() : setIsEditing(true))}
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
						setFormDataUser((prev: any) => ({
							...prev,
							[item.key]: item.key === "age" ? Number(text) : text,
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
	);
}