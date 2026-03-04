import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";
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
type NavItem = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  path: () => void;
  route: string;
  description: string;
};

export default function BottomNavigation() {
  const { t } = useTranslation();
  const router = useNavigation();
  const pathname = usePathname();
  const { theme } = useTheme();

  const getIconColor = (isActive: boolean) => {
    const primaryLight = "#22C55E";
    const primaryDark = "#16A34A";
    const primaryOcean = "#33c9ff";

    const inactiveLight = "#52525B";
    const inactiveDark = "#9ca3af";
    const inactiveOcean = "#6699cc";

    if (isActive) {
      if (theme === "ocean") return primaryOcean;
      if (theme === "dark") return primaryDark;
      return primaryLight;
    } else {
      if (theme === "ocean") return inactiveOcean;
      if (theme === "dark") return inactiveDark;
      return inactiveLight;
    }
  };

  const navItems: NavItem[] = [
    {
      label: t("BottomNavigation.navItems.nav1"),
      icon: "home",
      path: router.toDashboard,
      route: "/dashboard",
      description: "спокойствие, дом, стабильность",
    },
    {
      label: t("BottomNavigation.navItems.nav2"),
      icon: "calendar",
      path: router.toTrainingList,
      route: "/trainingDay", // Исправлено с /trainingDay/trainingDayView
      description: "энергия, здоровье, активность",
    },
    {
      label: t("BottomNavigation.navItems.nav3"),
      icon: "trending-up",
      path: router.toProgress,
      route: "/progress",
      description: "рост, успех, развитие",
    },
    {
      label: t("BottomNavigation.navItems.nav4") || "Профиль",
      icon: "user",
      path: router.toProfile,
      route: "/profile",
      description: "профиль, настройки, информация",
    },
  ];

  const rootClasses = cn(
    "flex-row justify-between items-center p-2",
    "bg-background",
    "dark:bg-gray-800 dark:border-gray-700",
    "ocean:bg-ocean-card ocean:border-blue-800",
  );
  return (
    <View className={rootClasses}>
      {navItems.map(({ label, icon, path, route }, index) => {
        // Проверяем, начинается ли текущий путь с маршрута вкладки (для вложенных страниц)
        const isActive =
          pathname === route ||
          pathname?.startsWith(route + "/") ||
          ((!pathname || pathname === "/app") && index === 0);

        const iconColor = getIconColor(isActive);

        const buttonClasses = cn(
          "flex-1 mx-1 p-2 rounded-2xl items-center justify-center border",
          {
            "bg-white border-gray-100": !isActive && theme === "light",
            "bg-green-100 border-primary": isActive && theme === "light",

            "dark:bg-gray-800 dark:border-gray-700":
              !isActive && theme === "dark",
            "dark:bg-primary-900/30 dark:border-primary-500":
              isActive && theme === "dark",

            "ocean:bg-ocean-card ocean:border-blue-800":
              !isActive && theme === "ocean",
            "ocean:bg-ocean-primary/10 ocean:border-ocean-primary":
              isActive && theme === "ocean",
          },
        );

        const labelClasses = cn(
          "text-xs mt-1",
          isActive ? "font-normal" : "font-normal",
          {
            "text-primary": isActive && theme === "light",
            "text-gray-600": !isActive && theme === "light",

            "dark:text-primary-500": isActive && theme === "dark",
            "dark:text-gray-400": !isActive && theme === "dark",

            "ocean:text-ocean-primary": isActive && theme === "ocean",
            "ocean:text-ocean-foreground/80": !isActive && theme === "ocean",
          },
        );
        return (
          <TouchableOpacity
            key={route}
            className={buttonClasses}
            activeOpacity={0.85}
            onPress={path}
          >
            <Feather name={icon} size={22} color={iconColor} />
            <Text className={labelClasses}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
