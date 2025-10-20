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

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TrainingDaysProvider>
          <SafeAreaView className="flex-1 bg-background">
            <AuthGate>
              <Slot />
            </AuthGate>
          </SafeAreaView>
        </TrainingDaysProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

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
