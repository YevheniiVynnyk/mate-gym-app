import React from "react";
import { Text, View } from "react-native";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, text }) => (
  <View className="flex-1 bg-card rounded-2xl shadow-xl p-3 mx-2 items-center">
    {icon}
    <Text className="text-sm font-semibold mt-2">{title}</Text>
    <Text className="text-xs text-muted-foreground text-center mt-1">
      {text}
    </Text>
  </View>
);

export default Feature;
