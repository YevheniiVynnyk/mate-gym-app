import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TrainingDaysProvider } from "@/contexts/TrainingDaysContext";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLayout from "@/components/layout/AppLayout";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Slot } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n"; // Предполагаем, что i18n.ts находится в папке /i18n
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

// Загрузка сплэш-скрина должна быть отключена (unprevented) перед монтированием RootLayout
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TrainingDaysProvider>
              <SafeAreaView className="flex-1 bg-background">
                <AuthGate>
                  <Slot />
                </AuthGate>
              </SafeAreaView>
            </TrainingDaysProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

// Новый компонент-обертка для управления классом темы
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  // Кастомный класс для Nativewind: если тема 'ocean', добавляем класс 'ocean'.
  // Если 'light'/'dark', Nativewind управляет этим сам через useColorScheme.
  const customThemeClass = theme === "ocean" ? "ocean" : "";

  return (
    <SafeAreaView className={`flex-1 bg-background ${customThemeClass}`}>
      {children}
    </SafeAreaView>
  );
};

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
};
