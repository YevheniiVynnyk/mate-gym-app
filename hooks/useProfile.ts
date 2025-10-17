import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/contexts/AuthContext";
import { UserDTO, userService } from "@/services/userService";
import { fromUserDTO } from "@/services/mapper/userMapper";
import { imageService } from "@/services/imageService";
import { useNavigation } from "@/hooks/useNavigation";

export const useProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, logout, setUser } = useAuth();
	const router = useNavigation();

	const [avatarUri, setAvatarUri] = useState<string | null>(
		user?.imageId ? imageService.getUrl(user.imageId) : null
	);

	const [formDataUser, setFormDataUser] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		login: user?.login || "",
		phoneNumber: user?.phoneNumber || "",
		age: user?.age?.toString() || "",
		goals: (user as any)?.goals || "",
		status: (user as any)?.status || "",
		role: user?.role || "",
		trainerId: (user as any)?.trainerId?.toString() || "",
	});

	// 💾 Сохранение профиля
	const handleSaveUser = async () => {
		if (!user) return;
		try {
			setLoading(true);
			const updatedUser: UserDTO = {
				...user,
				...formDataUser,
				age: Number(formDataUser.age) || 0,
				role: (formDataUser.role || user.role) as UserDTO["role"],
			};

			await userService.updateUser(updatedUser);
			setUser(fromUserDTO(updatedUser));
			setIsEditing(false);
		} catch (err) {
			console.error("Ошибка при сохранении профиля:", err);
		} finally {
			setLoading(false);
		}
	};

	// 📸 Загрузка аватарки
	const pickAvatar = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"], // ✅ новый синтаксис (вместо MediaTypeOptions)
				quality: 0.8,
				allowsEditing: true,
				aspect: [1, 1],
			});

			if (!result.canceled) {
				const asset = result.assets[0];
				const fileData = {
					uri: asset.uri,
					type: asset.mimeType || "image/jpeg",
					name: asset.fileName || "avatar.jpg",
				};

				setLoading(true);
				const id = await imageService.upload(fileData);

				// ✅ Обновляем пользователя и стейт
				setUser((prev) => (prev ? { ...prev, imageId: id } : prev));
				console.log("✅ Изображение загружено. ID:", id);
			}
		} catch (err) {
			console.error("Ошибка загрузки изображения:", err);
		} finally {
			setLoading(false);
		}
	};

	// 🚪 Выход
	const handleLogout = async () => {
		await logout();
		router.toHome();
	};

	return {
		user,
		formDataUser,
		setFormDataUser,
		isEditing,
		setIsEditing,
		isPrivacyDialogOpen,
		setIsPrivacyDialogOpen,
		pickAvatar,
		handleSaveUser,
		handleLogout,
		loading,
	};
};