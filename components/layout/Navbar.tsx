import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@/hooks/useNavigation";
import { imageService } from "@/services/imageService";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const cn = (
  ...inputs: (string | Record<string, any> | null | undefined)[]
): string => {
  const classes: string[] = [];
  for (const input of inputs) {
    if (typeof input === "string" && input.trim()) {
      classes.push(input);
    } else if (typeof input === "object" && input !== null) {
      for (const key in input) {
        if (
          Object.prototype.hasOwnProperty.call(input, key) &&
          (input as any)[key]
        ) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
};

const getIconColor = (
  theme: string,
  type: "primary" | "secondary" | "danger"
) => {
  switch (type) {
    case "primary": // Иконка "Bell" (Уведомления)
      if (theme === "ocean") return "#6699cc"; // Muted blue
      if (theme === "dark") return "#9ca3af"; // gray-400
      return "gray";
    case "secondary": // Иконка "Heart" (Поддержка)
      return "red"; // Красный обычно остается одинаковым
    case "danger":
      return "red";
    default:
      return "gray";
  }
};

const Navbar = () => {
  const user = useAuth().user;
  const router = useNavigation();
  const [avatarUri, setAvatarUri] = useState<string | undefined>();
  const { theme } = useTheme();

  useEffect(() => {
    if (user?.imageId) {
      imageService
        .getBase64(user.imageId)
        .then(setAvatarUri)
        .catch(console.error);
    }
  }, [user?.imageId]);

  const rootClasses = cn(
    "h-20 flex-row items-center justify-between px-6 border-b",
    "bg-card border-border", // Общие классы
    "dark:bg-gray-800 dark:border-gray-700", // Dark тема
    "ocean:bg-ocean-card ocean:border-blue-800" // Ocean тема
  );

  // ✅ Адаптивные классы для текста "Mate Gym"
  const titleClasses = cn(
    "text-2xl font-bold",
    "text-primary dark:text-primary-400 ocean:text-ocean-primary"
  );

  // Получаем цвета иконок
  const bellColor = getIconColor(theme, "primary"); // "Bell" - вторичный цвет
  const heartColor = getIconColor(theme, "danger"); // "Heart" - красный
  return (
    <View className={rootClasses}>
      {/* Логотип и название */}
      <TouchableOpacity
        onPress={() => router.toDashboard()}
        className="flex-row items-center"
      >
        <Image
          source={require("../../assets/images/logo-3.png")}
          className="w-14 h-14 rounded-full mr-2"
          style={{ height: 56, width: 56 }}
        />
        <Text className={titleClasses}>Mate Gym</Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => router.toDeveloperSupport}
          className="mx-2"
        >
          <FontAwesome5 name="heart" size={22} color={heartColor} />
        </TouchableOpacity>

        <TouchableOpacity className="mx-2">
          <Feather name="bell" size={22} color={bellColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.toProfile()} className="mx-2">
          <Image
            source={{ uri: avatarUri }}
            className="w-14 h-14 rounded-full "
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
