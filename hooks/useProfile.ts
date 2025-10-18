import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { UserDTO, userService } from '@/services/userService';
import { fromUserDTO } from '@/services/mapper/userMapper';
import { imageService } from '@/services/imageService';
import { useNavigation } from '@/hooks/useNavigation';

export const useProfile = () => {
    const { user, logout, setUser } = useAuth();
    // ДОДАЙТЕ ЛОГ
    console.log('User from AuthContext on load:', user);
    // ДОДАЙТЕ ЛОГ
    console.log('Initial Birthday value:', user?.birthday);

    const [isEditing, setIsEditing] = useState(false);
    const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [formDataUser, setFormDataUser] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        login: user?.login || '',
        phoneNumber: user?.phoneNumber || '',
        age: String(user?.age || ''),
        birthday: user?.birthday instanceof Date ? user.birthday.toISOString().split('T')[0] : '',
        goals: (user as any)?.goals || '',
        status: (user as any)?.status || '',
        role: user?.role || '',
        trainerId: (user as any)?.trainerId?.toString() || '',
    });

    const router = useNavigation();

    const handleSaveUser = async () => {
        if (!user) return;
        try {
            const ageString = String(formDataUser.age).trim();
            let ageValue = 0;
            if (ageString !== '') {
                const parsed = parseInt(ageString, 10);
                if (!isNaN(parsed)) {
                    ageValue = parsed;
                }
            }
            const updatedUser: UserDTO = {
                ...user,
                ...formDataUser,
                // Вікові та інші оновлені дані
                age: ageValue, // ✅ ЧИСЛО
                role: (formDataUser.role || user.role) as UserDTO['role'],
            };
            // --- 4. ВІДПРАВКА ТА СИНХРОНІЗАЦІЯ ---
            console.log('updatedUser ', updatedUser);

            await userService.updateUser(updatedUser);

            // ✅ 5. СИНХРОНІЗАЦІЯ: Отримання свіжих даних з сервера
            const freshUserDTO = await userService.getUserById(user.id);
            console.log('freshUserDTO ', freshUserDTO);
            setUser(fromUserDTO(freshUserDTO));
            // ✅ ВИПРАВЛЕННЯ: Повторно ініціалізуємо formDataUser ВСІМА ПОЛЯМИ
            setFormDataUser({
                firstName: freshUserDTO?.firstName || '',
                lastName: freshUserDTO?.lastName || '',
                email: freshUserDTO?.email || '',
                login: freshUserDTO?.login || '',
                phoneNumber: freshUserDTO?.phoneNumber || '',
                role: freshUserDTO?.role || '',
                goals: (freshUserDTO as any)?.goals || '',
                status: (freshUserDTO as any)?.status || '',
                trainerId: (freshUserDTO as any)?.trainerId?.toString() || '',

                // Зверніть увагу, що тут freshUserDTO?.birthday має бути рядком
                birthday: freshUserDTO?.birthday || '',
                age: String(freshUserDTO?.age || ''),
            });
            setIsEditing(false);
        } catch (err) {
            console.error('Ошибка при сохранении профиля:', err);
            // Додайте тут логіку для виведення повідомлення про помилку користувачеві
        }
    };

    /*const pickAvatar = async () => {
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
    };*/
    const pickAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            // Тимчасове повернення до старого синтаксису, щоб обійти undefined
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });
        // ...
        if (!result.canceled) {
            const asset = result.assets?.[0];
            if (asset) {
                // ...
                try {
                    // Створюємо об'єкт з метаданими файлу
                    const fileData = {
                        uri: asset.uri,
                        // Вкрай важливо передати mimeType
                        type: asset.mimeType || 'image/jpeg',
                        name: asset.fileName || asset.uri.split('/').pop() || 'profile_image.jpg',
                    };

                    // Викликаємо сервіс з коректним об'єктом даних
                    const uploaded = await imageService.upload(fileData);
                    setUser((prev) => (prev ? { ...prev, imageId: uploaded } : prev));
                } catch (err) {
                    console.error('ошибки при загрузке фото:', err);
                }
            }
        }
    };

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
        avatarUri,
        pickAvatar,
        handleSaveUser,
        handleLogout,
        loading,
    };
};