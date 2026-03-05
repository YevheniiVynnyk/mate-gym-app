import React, { useEffect } from "react";
import { View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import Banner from "../ads/Banner";
import { useAuth, UserSessionState } from "@/contexts/AuthContext";
import { cn } from "@/components/ui/Card";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { sessionState, isLoading } = useAuth();

  const isWelcomePage = pathname === "/auth";

  useEffect(() => {
    if (isLoading) return;

    if (sessionState === UserSessionState.UNAUTHENTICATED && !isWelcomePage) {
      router.replace("/auth");
    } else if (
      sessionState === UserSessionState.AUTHENTICATED &&
      isWelcomePage
    ) {
      router.replace("/dashboard");
    }
  }, [sessionState, isLoading, pathname, isWelcomePage]);

  const rootClasses = cn(
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background",
  );

  if (isWelcomePage || isLoading || sessionState === UserSessionState.UNKNOWN) {
    return <View className={rootClasses}>{children}</View>;
  }

  return (
    <View className={rootClasses}>
      <Banner />
      <Navbar />

      {/* Основной контент с отступом снизу под навигацию и баннер */}
      <View className="flex-1">{children}</View>

      {/* Контейнер для навигации и баннера */}
      <BottomNavigation />
    </View>
  );
};

export default AppLayout;
