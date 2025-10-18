import React from "react";
import { View, Text } from "react-native";

export function Badge({ text }: { text: string }) {
    return (
        <View className="bg-gray-300 rounded-md px-2 py-0.5">
            <Text className="text-xs">{text}</Text>
        </View>
    );
}