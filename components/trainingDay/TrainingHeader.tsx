import React from "react";
import { Text, View } from "react-native";

export function TrainingHeader() {
  return (
    <View className="mb-4">
      <Text className="text-2xl text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
        Мои тренировки
      </Text>
      {/*<Text className="text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70">*/}
      {/*  Планируйте и отслеживайте тренировки*/}
      {/*</Text>*/}
    </View>
  );
}
