import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, User } from "lucide-react-native";
import { imageService } from "@/services/imageService";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext"; // Добавляем useTheme для получения цветов

export default function AvatarSection({ user, pickAvatar, loading }: any) {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Используем useTheme для получения динамических цветов
  const { theme } = useTheme();
  useEffect(() => {
    if (user?.imageId) {
      imageService
        .getBase64(user.imageId)
        .then(setAvatarUri)
        .catch(console.error);
    }
  }, [user?.imageId]);

  // Динамический цвет иконки камеры
  const cameraIconColor =
    theme === "ocean"
      ? "#33c9ff" // ocean:primary-DEFAULT
      : theme === "dark"
        ? "#93c5fd" // blue-300
        : "#007AFF"; // light theme default blue

  return (
    <View
      className="bg-white p-4 rounded-lg mb-4 shadow-sm items-center
      dark:bg-gray-800 
      ocean:bg-ocean-card-DEFAULT"
    >
      {/* Контейнер аватарки */}
      <View className="relative">
        {/* Аватарка - для увеличения */}
        <TouchableOpacity
          onPress={() => avatarUri && setIsModalOpen(true)}
          className="w-24 h-24 rounded-full items-center justify-center"
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View
              className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center 
              dark:bg-gray-700 
              ocean:bg-ocean-background"
            >
              <User
                size={60}
                color={
                  theme === "dark"
                    ? "#4b5563"
                    : theme === "ocean"
                      ? "#003366"
                      : "#ccc"
                }
              />
            </View>
          )}

          {loading && (
            <View
              className="absolute inset-0 items-center justify-center rounded-full 
            bg-white/50 
            dark:bg-black/50"
            >
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          )}
        </TouchableOpacity>

        {/* Кнопка камеры */}
        <TouchableOpacity
          onPress={pickAvatar}
          className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md -mr-1 
          dark:bg-gray-700 
          ocean:bg-ocean-background"
        >
          <Camera size={20} color={cameraIconColor} />
        </TouchableOpacity>
      </View>

      {!avatarUri && (
        <Text
          className="text-lg font-medium mt-2 text-center text-black
        dark:text-gray-100 
        ocean:text-ocean-foreground"
        >
          Фото профиля
        </Text>
      )}

      {/* Модалка */}
      <Modal visible={isModalOpen} transparent={true} animationType="fade">
        <Pressable
          className="flex-1 bg-black/80 items-center justify-center"
          onPress={() => setIsModalOpen(false)}
        >
          {avatarUri && (
            <Image
              source={{ uri: avatarUri }}
              className="w-80 h-80 rounded-lg"
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </View>
  );
}
