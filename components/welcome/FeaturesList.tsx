import React from "react";
import { View } from "react-native";
import Feature from "./Feature";
import { Clock, TrendingUp, Users } from "lucide-react-native";

const FeaturesList = () => (
  <View className="flex-row justify-between mt-2 mx-2 space-x-4">
    <Feature
      icon={<TrendingUp color="#4ADE80" size={22} />}
      title="Прогресс"
      text="Следи за результатами"
    />
    <Feature
      icon={<Users color="#34C759" size={22} />}
      title="Тренеры"
      text="Помощь от профи"
    />
    <Feature
      icon={<Clock color="#3B82F6" size={22} />}
      title="Удобно"
      text="Всё под рукой"
    />
  </View>
);

export default FeaturesList;
