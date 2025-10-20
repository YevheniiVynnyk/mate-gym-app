import React from "react";
import { Text, View } from "react-native";
import { Dumbbell } from "lucide-react-native";

const Header = () => (
  <View className="items-center mb-4">
    <View className="flex-row items-center justify-center gap-3 mb-4">
      <View className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
        <Dumbbell color="#fff" size={28} />
      </View>
      <Text className="text-3xl font-bold text-foreground font-sans">
        Mate Gym
      </Text>
    </View>

    <Text className="text-center text-2xl font-bold leading-tight font-sans">
      Твой персональный{" "}
      <Text className="text-primary font-sans">фитнес-тренер</Text> в кармане
    </Text>

    <Text className="text-center text-muted-foreground mt-3 px-3 leading-relaxed font-sans">
      Создавайте тренировки, отслеживайте прогресс и достигайте целей вместе с
      профессиональными тренерами
    </Text>
  </View>
);

export default Header;
