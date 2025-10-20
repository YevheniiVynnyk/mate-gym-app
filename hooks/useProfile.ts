import {useState, useCallback} from "react";
import * as ImagePicker from "expo-image-picker";
import {useAuth} from "@/contexts/AuthContext";
import {UserDTO, userService} from "@/services/userService";
import {fromUserDTO} from "@/services/mapper/userMapper";
import {imageService} from "@/services/imageService";
import {useNavigation} from "@/hooks/useNavigation";

// ✅ ФУНКЦИЯ ДЛЯ ПОДСЧЕТА ВОЗРАСТА (клиентская логика)
const calculateAge = (birthdayString: string): number => {
    if (!birthdayString) return 0;
    
    try {
        // Создаем объект Date из строки "YYYY-MM-DD"
        // Используем ISO-формат для предотвращения ошибок часового пояса
        const birthday = new Date(birthdayString);
        if (isNaN(birthday.getTime())) return 0;

        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDifference = today.getMonth() - birthday.getMonth();

        // Если текущий месяц раньше месяца рождения, или
        // если месяцы одинаковые, но день раньше дня рождения, уменьшаем возраст на 1.
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age > 0 ? age : 0;
    } catch (e) {
        console.error("Ошибка при подсчете возраста:", e);
        return 0;
    }
};

export const useProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const {user, logout, setUser} = useAuth();
	const router = useNavigation();

	const [formDataUser, setFormDataUser] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		login: user?.login || "",
		phoneNumber: user?.phoneNumber || "",
		age: user?.age?.toString() || "",
		// ✅ Инициализируем birthday. Сервер ожидает "YYYY-MM-DD".
        birthday: user?.birthday || "",
		goals: (user as any)?.goals || "",
		status: (user as any)?.status || "",
		role: user?.role || "",
		trainerId: (user as any)?.trainerId?.toString() || "",
	});
// ✅ НОВАЯ ФУНКЦИЯ ДЛЯ УСТАНОВКИ ВОЗРАСТА
    const setFormDataUserWithAge = useCallback((newBirthday: string) => {
        const calculatedAge = calculateAge(newBirthday);
        
        setFormDataUser(prev => ({
            ...prev,
            birthday: newBirthday,
            // 🎯 ОБНОВЛЯЕМ age НА ОСНОВЕ РАССЧИТАННОГО ЗНАЧЕНИЯ
            age: calculatedAge.toString(), 
        }));
    }, [setFormDataUser]);

	// 💾 Сохранение профиля
	const handleSaveUser = async () => {
		if (!user) return;
		try {
			setLoading(true);
			// 🎯 Используем актуальный возраст из formDataUser, 
            // который был обновлен нашей функцией setFormDataUserWithAge
            const finalAge = Number(formDataUser.age) || 0;

			const updatedUser: UserDTO = {
				...user,
				...formDataUser,
				age: finalAge,
				// ✅ birthday — это строка, уже отформатированная в "YYYY-MM-DD"
                birthday: formDataUser.birthday,
				role: (formDataUser.role || user.role) as UserDTO["role"],
			};
// Перед отправкой:
console.log("Saving user with birthday:", updatedUser.birthday);
			await userService.updateUser(updatedUser);
			// После обновления локального стейта:
const finalUser = fromUserDTO(updatedUser);
			console.log("Local user set to birthday:", finalUser.birthday);
			setUser(finalUser);
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
				setUser((prev) => (prev ? {...prev, imageId: id} : prev));
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
		setFormDataUserWithAge,
		setIsEditing,
		isPrivacyDialogOpen,
		setIsPrivacyDialogOpen,
		pickAvatar,
		handleSaveUser,
		handleLogout,
		loading,
	};
};