import React from "react";
import { View, Text } from "react-native";
import { TextInputUI } from "@/components/ui/TextInputUI";

interface Props {
  data: { weight?: string; height?: string };
  updateData: (key: string, value: any) => void;
}

export const BodyMetricsStep: React.FC<Props> = ({ data, updateData }) => {
  return (
    <View className="w-full">
      <Text className="text-xl font-bold mb-4 text-center text-foreground dark:text-gray-100">
        Body Metrics
      </Text>
      <View className="space-y-4">
        <TextInputUI
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={data.weight}
          onChangeText={(t) => updateData("weight", t)}
        />
        <TextInputUI
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={data.height}
          onChangeText={(t) => updateData("height", t)}
        />
      </View>
    </View>
  );
};
