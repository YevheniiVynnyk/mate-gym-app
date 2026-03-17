import React, { useEffect } from "react";
import { View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import Banner from "../ads/Banner";
import { useAuth, UserSessionState } from "@/contexts/AuthContext";
import { cn } from "@/components/ui/Card";
import { LoadingPage } from "@/components/ui/LoadingPage";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { sessionState, isLoading } = useAuth();

  const isAuthPage = pathname === "/auth";

  useEffect(() => {
    if (isLoading) return;

    const isProtected = !isAuthPage;

    // Неавторизованный → только auth
    if (sessionState === UserSessionState.UNAUTHENTICATED && isProtected) {
      router.replace("/auth");
      return;
    }

    // Авторизованный → не должен быть на auth
    if (sessionState === UserSessionState.AUTHENTICATED && isAuthPage) {
      router.replace("/dashboard");
    }
  }, [sessionState, isLoading, pathname]);

  const rootClasses = cn(
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background",
  );

  // Пока идет загрузка или мы неавторизованы и находимся на защищенной странице, показываем загрузку
  if (
    isLoading ||
    (sessionState === UserSessionState.UNAUTHENTICATED && !isAuthPage)
  ) {
    return <LoadingPage />;
  }

  // Если это страница аутентификации, показываем только ее, без навигации
  if (isAuthPage) {
    return <View className={rootClasses}>{children}</View>;
  }

  // Для авторизованных пользователей показываем полный лейаут
  return (
    <View className={rootClasses}>
      <Banner />
      <Navbar />
      <View className="flex-1">{children}</View>
      <BottomNavigation />
    </View>
  );
};

export default AppLayout;
