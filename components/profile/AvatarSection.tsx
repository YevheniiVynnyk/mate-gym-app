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

export default function AvatarSection({ user, pickAvatar, loading }: any) {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.imageId) {
      imageService
        .getBase64(user.imageId)
        .then(setAvatarUri)
        .catch(console.error);
    }
  }, [user?.imageId]);

  return (
    <View className="bg-white p-4 rounded-lg mb-4 shadow-sm items-center">
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
            <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center">
              <User size={60} color="#ccc" />
            </View>
          )}

          {loading && (
            <View className="absolute inset-0 items-center justify-center bg-white/50 rounded-full">
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          )}
        </TouchableOpacity>

        {/* Кнопка камеры */}
        <TouchableOpacity
          onPress={pickAvatar}
          className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
        >
          <Camera size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {!avatarUri && (
        <Text className="text-lg font-medium mt-2 text-center text-black">
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
