import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/components/ui/Card";

type NavItem = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  path: () => void;
  route: string;
};

export default function BottomNavigation() {
  const { t } = useTranslation();
  const router = useNavigation();
  const pathname = usePathname();
  const { theme } = useTheme();

  const navItems: NavItem[] = [
    {
      label: t("BottomNavigation.navItems.nav1"),
      icon: "home",
      path: router.toDashboard,
      route: "/dashboard",
    },
    {
      label: t("BottomNavigation.navItems.nav2"),
      icon: "calendar",
      path: router.toTrainingList,
      route: "/trainingDay",
    },
    {
      label: t("BottomNavigation.navItems.nav3"),
      icon: "trending-up",
      path: router.toProgress,
      route: "/progress",
    },
    {
      label: t("BottomNavigation.navItems.nav4") || "Profile",
      icon: "user",
      path: router.toProfile,
      route: "/profile",
    },
  ];

  return (
    <View>
      <View
        className={cn(
          "flex-row justify-between items-center p-2 rounded-3xl shadow-lg",
          "bg-white/90 dark:bg-gray-800/90 ocean:bg-ocean-card/90",
          "border border-gray-100 dark:border-gray-700 ocean:border-blue-800/50",
          // "backdrop-blur-md" // Работает на iOS
        )}
        style={{ elevation: 10 }} // Тень для Android
      >
        {navItems.map(({ label, icon, path, route }, index) => {
          const isActive =
            pathname === route ||
            pathname?.startsWith(route + "/") ||
            ((!pathname || pathname === "/app") && index === 0);

          return (
            <TouchableOpacity
              key={route}
              className={cn(
                "flex-1 items-center justify-center py-2 rounded-2xl",
                isActive &&
                  "bg-primary/10 dark:bg-primary-500/20 ocean:bg-ocean-primary/20",
              )}
              activeOpacity={0.7}
              onPress={path}
            >
              <Feather
                name={icon}
                size={24}
                className={cn(
                  isActive
                    ? "text-primary dark:text-primary-400 ocean:text-ocean-primary"
                    : "text-gray-400 dark:text-gray-500 ocean:text-ocean-foreground/50",
                )}
              />
              {isActive && (
                <Text
                  className={cn(
                    "text-[10px] font-bold mt-1",
                    "text-primary dark:text-primary-400 ocean:text-ocean-primary",
                  )}
                >
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
