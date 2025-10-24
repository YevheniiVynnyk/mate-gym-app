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
import { useTheme } from "@/contexts/ThemeContext";
import { CardUI } from "@/components/ui/CardUI";

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

  return (
    <CardUI className="p-4 mb-4 items-center">
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
              className="w-24 h-24 rounded-full bg-muted items-center justify-center 
              dark:bg-gray-700 
              ocean:bg-ocean-muted"
            >
              <User
                size={60}
                // ✅ ИЗМЕНЕНИЕ: Используем text-muted-foreground для цвета иконки
                color={
                  theme === "dark"
                    ? "#6b7280" // dark:text-gray-500
                    : theme === "ocean"
                      ? "#336699" // Более темный синий
                      : "#9ca3af" // gray-400
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
              <ActivityIndicator
                size="small"
                color={
                  theme === "dark" || theme === "ocean" ? "white" : "#4ADE80" // Primary DEFAULT
                }
              />
            </View>
          )}
        </TouchableOpacity>

        {/* Кнопка камеры */}
        <TouchableOpacity
          onPress={pickAvatar}
          className="absolute bottom-0 right-0 bg-card p-1 rounded-full shadow-md -mr-1 
          dark:bg-gray-700 
          ocean:bg-ocean-background"
        >
          <Camera
            size={20}
            color={
              theme === "ocean"
                ? "#33c9ff"
                : theme === "dark"
                  ? "#10B981" // Немного темнее primary
                  : "#4ADE80" // Primary DEFAULT
            }
          />
        </TouchableOpacity>
      </View>

      {!avatarUri && (
        <Text
          className="text-lg font-medium mt-2 text-center text-foreground
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
    </CardUI>
  );
}
