import React from "react";
import {Slot} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider, useAuth} from "@/contexts/AuthContext";
import {TrainingDaysProvider} from "@/contexts/TrainingDaysContext";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLayout from "@/components/layout/AppLayout";
import {ActivityIndicator, View} from "react-native";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <TrainingDaysProvider>
                        <SafeAreaView className="flex-1 bg-background">
                            <AuthGate>
                                <Slot/>
                            </AuthGate>
                        </SafeAreaView>
                </TrainingDaysProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

const AuthGate: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {user, isLoading} = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator/>
            </View>
        );
    }

    if (!user) {
        return <>{children}</>; // Если нет юзера — просто рендерим Slot напрямую
    }

    // Если авторизован — оборачиваем в AppLayout
    return <AppLayout>{children}</AppLayout>;
};