import React from "react";
import { View } from "react-native";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
//import { useTheme } from "@/contexts/ThemeContext";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  //const { theme } = useTheme();
  const rootClasses = cn(
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background-1",
    // Стили для тем: предполагаем, что bg-background сам по себе недостаточно
    // адаптирован для Ocean или Dark, и нам нужны явные переопределения.
    "bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background"
  );
  return (
    <View className={rootClasses}>
      <Navbar />
      <View className="flex-1">{children}</View>
      <BottomNavigation />
    </View>
  );
};

export default AppLayout;
