import React from "react";
import {ScrollView, Text, View} from "react-native";
import {User} from "lucide-react-native";
import {useProfile} from "@/hooks/useProfile";
import AvatarSection from "@/components/profile/AvatarSection";
import UserInfoSection from "@/components/profile/UserInfoSection";
import SettingsSection from "@/components/profile/SettingsSection";
import PrivacyDialog from "@/components/profile/PrivacyDialog";

export default function Profile() {
	const {
		loading,
		avatarUri,
		pickAvatar,
		isEditing,
		setIsEditing,
		formDataUser,
		setFormDataUser,
		handleSaveUser,
		handleLogout,
		isPrivacyDialogOpen,
		setIsPrivacyDialogOpen,
	} = useProfile();
	return (
		<ScrollView className="flex-1 bg-gray-50 p-4">
			<View className="flex-row items-center mb-4">
				<Text className="  text-2xl font-bold text-center">Профиль</Text>
			</View>

			<AvatarSection avatarUri={avatarUri} pickAvatar={pickAvatar} />
			<UserInfoSection
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				formDataUser={formDataUser}
				setFormDataUser={setFormDataUser}
				handleSaveUser={handleSaveUser}
			/>
			<SettingsSection handleLogout={handleLogout} />

			<PrivacyDialog
				open={isPrivacyDialogOpen}
				onClose={() => setIsPrivacyDialogOpen(false)}
			/>
		</ScrollView>
	);
}