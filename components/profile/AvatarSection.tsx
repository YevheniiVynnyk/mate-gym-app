import {Image, Text, TouchableOpacity, View} from "react-native";
import {Camera, User} from "lucide-react-native";

export default function AvatarSection({avatarUri, pickAvatar}: any) {
	return (
		<View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
			
			<TouchableOpacity onPress={pickAvatar} className="items-center relative">
				{avatarUri ? (
					<Image source={{uri: avatarUri}} className="w-24 h-24 rounded-full"/>
				) : (
					<><User size={60} color="#ccc"/>
					<Text className="text-lg font-semibold mb-2 text-center">Фото профиля</Text></>
				)}
				
				<Camera size={20} className="absolute bottom-0 right-1" color="#007AFF"/>
			</TouchableOpacity>
		</View>
	);
}
