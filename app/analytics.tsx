import React from 'react';
import { Text, View } from 'react-native';
import Analytics from '@/components/analytics/Analytics';
import { MaterialIcons } from '@expo/vector-icons';

const AnalyticsPage = () => {
    return (
        <View className="flex-1 bg-white px-4 pt-5">
            {/* Заголовок */}
            <View className="flex-row items-center gap-2.5 mb-5">
                <MaterialIcons name="bar-chart" size={32} color="#007AFF" />
                <Text className="text-2xl font-bold text-[#111]">Моя аналитика</Text>
            </View>

            {/* Контент */}
            <View className="flex-1">
                <Analytics />
            </View>
        </View>
    );
};

export default AnalyticsPage;
