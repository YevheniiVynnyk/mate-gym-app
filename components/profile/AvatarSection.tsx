import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, User, X } from "lucide-react-native";
import { imageService } from "@/services/imageService";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, cn } from "@/components/ui/Card";

export default function AvatarSection({ user, pickAvatar, loading }: any) {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <View className="items-center mb-8 mt-4">
      {/* Контейнер аватарки с декоративным кольцом */}
      <View className="relative mb-4">
        <View className="absolute -inset-1 rounded-full border-2 border-primary/30 border-dashed animate-spin-slow" />
        
        <TouchableOpacity
          onPress={() => avatarUri && setIsModalOpen(true)}
          className="w-28 h-28 rounded-full items-center justify-center border-4 border-background dark:border-gray-900 ocean:border-ocean-background shadow-xl bg-card dark:bg-gray-800"
          activeOpacity={0.9}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          ) : (
            <User
              size={48}
              className="text-muted-foreground/50 dark:text-gray-500"
            />
          )}

          {loading && (
            <View className="absolute inset-0 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
              <ActivityIndicator size="small" color="white" />
            </View>
          )}
        </TouchableOpacity>

        {/* Кнопка камеры */}
        <TouchableOpacity
          onPress={pickAvatar}
          className="absolute bottom-0 right-0 bg-primary p-2.5 rounded-full shadow-lg border-4 border-background dark:border-gray-900 ocean:border-ocean-background"
          activeOpacity={0.8}
        >
          <Camera size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Имя и Email */}
      <View className="items-center">
        <Text className="text-2xl font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground mb-1">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className="text-sm font-medium text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/60 bg-secondary/50 px-3 py-1 rounded-full overflow-hidden">
          {user?.email}
        </Text>
      </View>

      {/* Модалка просмотра фото */}
      <Modal visible={isModalOpen} transparent={true} animationType="fade">
        <View className="flex-1 bg-black/95 items-center justify-center relative">
          <TouchableOpacity 
            onPress={() => setIsModalOpen(false)}
            className="absolute top-12 right-6 z-10 p-3 bg-white/10 rounded-full"
          >
            <X size={24} color="white" />
          </TouchableOpacity>
          
          {avatarUri && (
            <Image
              source={{ uri: avatarUri }}
              className="w-full h-full"
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
