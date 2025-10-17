import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { useProgress } from '@/hooks/useProgress';
import WeeklyActivitySection from '@/components/progress/WeeklyActivitySection';
import QuickStatsSection from '@/components/progress/QuickStatsSection';
import TrainingTimeSection from '@/components/progress/TrainingTimeSection';
import EmptyState from '@/components/progress/EmptyState';

export default function Progress() {
    const { quickStats, weeklyStats, noData, loading, completedDays, totalDays, weekProgress } =
        useProgress();

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#007AFF" />
                <Text className="mt-2 text-gray-700">Загрузка...</Text>
            </View>
        );
    }

    if (noData) return <EmptyState />;

    return (
        <ScrollView className="flex-1 p-4">
            <View className="flex-row items-center gap-2 mb-4">
                <TrendingUp size={28} color="#007AFF" />
                <Text className="text-2xl font-bold">Мой прогресс</Text>
            </View>

            <WeeklyActivitySection
                weeklyStats={weeklyStats}
                completedDays={completedDays}
                totalDays={totalDays}
                weekProgress={weekProgress}
            />

            <QuickStatsSection quickStats={quickStats} />
            <TrainingTimeSection />
        </ScrollView>
    );
}
