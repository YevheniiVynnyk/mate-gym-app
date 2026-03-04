import React, { useEffect } from "react";
import { View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import Banner from "../ads/Banner";
import { useAuth, UserSessionState } from "@/contexts/AuthContext";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { sessionState, isLoading } = useAuth();
  
  const isWelcomePage = pathname === "/auth";

  // Редирект на /auth, если пользователь не авторизован
  useEffect(() => {
    if (isLoading) return;

    if (sessionState === UserSessionState.UNAUTHENTICATED && !isWelcomePage) {
       // Используем replace, чтобы нельзя было вернуться назад
       router.replace("/auth");
    } else if ((sessionState === UserSessionState.AUTHENTICATED || sessionState === UserSessionState.GUEST) && isWelcomePage) {
       // Если пользователь уже авторизован, но находится на странице входа, перенаправляем на дашборд
       router.replace("/dashboard");
    }
  }, [sessionState, isLoading, pathname, isWelcomePage]);

  const rootClasses = cn(
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background-1",
    "bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background",
  );

  // Если это страница Auth или идет загрузка, не показываем навигацию и хедер
  if (isWelcomePage || isLoading || sessionState === UserSessionState.UNKNOWN) {
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
