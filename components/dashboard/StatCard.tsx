import React from "react";
import { Text, View } from "react-native";

export function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <View className="flex-1 bg-white p-3 rounded-lg mx-1">
      <Text className="text-sm font-bold">{title}</Text>
      <Text className="text-lg font-bold mt-1">{value}</Text>
      {subtitle && (
        <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
      )}
    </View>
  );
}
