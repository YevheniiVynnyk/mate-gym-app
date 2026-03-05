import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@/hooks/useNavigation";
import { imageService } from "@/services/imageService";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { usePathname } from "expo-router";
import { cn } from "@/components/ui/Card";

const getPageTitle = (pathname: string) => {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/trainingDay")) return "Workouts";
  if (pathname === "/progress") return "Progress";
  if (pathname === "/profile") return "Profile";
  return "Mate Gym";
};

const Navbar = () => {
  const { user } = useAuth();
  const router = useNavigation();
  const pathname = usePathname();
  const [avatarUri, setAvatarUri] = useState<string | undefined>();
  const { theme } = useTheme();

  useEffect(() => {
    if (user?.imageId) {
      imageService
        .getBase64(user.imageId)
        .then(setAvatarUri)
        .catch(console.error);
    } else {
      setAvatarUri(undefined);
    }
  }, [user?.imageId]);

  const title = getPageTitle(pathname);

  return (
    <View
      className={cn(
        "h-16 flex-row items-center justify-between px-4 border-b shadow-sm z-10",
        "bg-background border-border",
        "dark:bg-gray-900 dark:border-gray-800",
        "ocean:bg-ocean-card ocean:border-blue-800"
      )}
    >
      {/* Левая часть: Логотип и Заголовок */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.toDashboard()} activeOpacity={0.7}>
          <Image
            source={require("../../assets/images/logo-3.png")}
            className="w-10 h-10 rounded-full mr-3"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          className={cn(
            "text-xl font-bold tracking-tight",
            "text-foreground dark:text-gray-100 ocean:text-ocean-foreground"
          )}
        >
          {title}
        </Text>
      </View>

      {/* Правая часть: Действия и Аватар */}
      <View className="flex-row items-center space-x-3">
        {/* Кнопка уведомлений (пример) */}
        <TouchableOpacity
          className={cn(
            "p-2 rounded-full",
            "bg-secondary/50 dark:bg-gray-800 ocean:bg-ocean-primary/10"
          )}
        >
          <Feather
            name="bell"
            size={20}
            className="text-foreground dark:text-gray-300 ocean:text-ocean-foreground"
          />
        </TouchableOpacity>

        {/* Аватар профиля */}
        <TouchableOpacity onPress={() => router.toProfile()} activeOpacity={0.8}>
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="w-9 h-9 rounded-full border border-border dark:border-gray-700"
            />
          ) : (
            <View
              className={cn(
                "w-9 h-9 rounded-full items-center justify-center border",
                "bg-secondary dark:bg-gray-800 border-border dark:border-gray-700 ocean:bg-ocean-primary/20 ocean:border-ocean-primary/30"
              )}
            >
              <Feather
                name="user"
                size={18}
                className="text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground"
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
