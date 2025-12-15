import React from "react";
import { View } from "react-native";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const rootClasses = cn(
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background-1",
    "bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background",
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
