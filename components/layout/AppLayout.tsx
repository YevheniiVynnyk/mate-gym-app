import React from "react";
import { View } from "react-native";
import { usePathname } from "expo-router";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import Banner from "../ads/Banner";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const isWelcomePage = pathname === "/welcome";

  const rootClasses = cn(
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background-1",
    "bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background",
  );

  // Если это страница Auth, не показываем навигацию и хедер
  if (isWelcomePage) {
    return <View className={rootClasses}>{children}</View>;
  }

  return (
    <View className={rootClasses}>
      <Navbar />
      <View className="flex-1">{children}</View>
      <BottomNavigation />
      <Banner />
    </View>
  );
};

export default AppLayout;
