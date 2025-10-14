import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {useAuth} from "@/contexts/AuthContext";
import {UserDTO, userService} from "@/services/userService";
import {fromUserDTO} from "@/services/mapper/userMapper";
import {imageService} from "@/services/imageService";
import {useRouter} from "expo-router";

export const useProfile = () => {
	const {user, logout, setUser} = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
	const [avatarUri, setAvatarUri] = useState<string | null>(null);

	const [formDataUser, setFormDataUser] = useState({
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

	const handleSaveUser = async () => {
		if (!user) return;
		try {
			const updatedUser: UserDTO = {
				...user,
				...formDataUser,
				age: Number(formDataUser.age),
			};
			await userService.updateUser(updatedUser);
			setUser(fromUserDTO(updatedUser));
			setIsEditing(false);
		} catch (err) {
			console.error(err);
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

	return {
		user,
		body,
		formDataUser,
		setFormDataUser,
		isEditing,
		setIsEditing,
		isPrivacyDialogOpen,
		setIsPrivacyDialogOpen,
		avatarUri,
		pickAvatar,
		loading,
		handleSaveUser,
		handleLogout,
	};
};
