import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Check, Star, Dumbbell, Home, Building } from "lucide-react-native";

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  equipmentType: "home" | "basic-gym" | "full-gym";
  features: string[];
  exercises: number;
  workoutsPerWeek: number;
  popular?: boolean;
}

interface PlanCardProps {
  plan: TrainingPlan;
  onPurchase: (planId: string) => void;
  isPurchased?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onPurchase, isPurchased = false }) => {
  const getEquipmentIcon = () => {
    switch (plan.equipmentType) {
      case "home": return <Home size={18} color="#555" />;
      case "basic-gym": return <Dumbbell size={18} color="#555" />;
      case "full-gym": return <Building size={18} color="#555" />;
      default: return <Dumbbell size={18} color="#555" />;
    }
  };

  const getEquipmentLabel = () => {
    switch (plan.equipmentType) {
      case "home": return "Дом/Улица";
      case "basic-gym": return "Малый зал";
      case "full-gym": return "Полный зал";
      default: return "Не указано";
    }
  };

  const getLevelLabel = () => {
    switch (plan.level) {
      case "beginner": return "Начинающий";
      case "intermediate": return "Средний";
      case "advanced": return "Продвинутый";
      default: return "Не указано";
    }
  };

  const getLevelColors = () => {
    switch (plan.level) {
      case "beginner": return { bg: "bg-green-100", text: "text-green-800" };
      case "intermediate": return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "advanced": return { bg: "bg-red-100", text: "text-red-800" };
      default: return { bg: "bg-gray-200", text: "text-gray-800" };
    }
  };

  const levelColors = getLevelColors();

  return (
      <View className={`bg-white rounded-xl p-4 mb-4 shadow ${plan.popular ? "border-2 border-blue-400" : ""}`}>
        {plan.popular && (
            <View className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex-row items-center bg-blue-400 px-3 py-1 rounded-full">
              <Star size={14} color="#fff" className="mr-1" />
              <Text className="text-white text-xs font-semibold">Популярный</Text>
            </View>
        )}

        <View className="mb-2">
          <View className="flex-row justify-between mb-2">
            <View className="flex-row items-center space-x-1">
              {getEquipmentIcon()}
              <Text className="text-sm text-gray-700">{getEquipmentLabel()}</Text>
            </View>
            <View className={`${levelColors.bg} px-2 py-1 rounded-lg`}>
              <Text className={`text-xs font-semibold ${levelColors.text}`}>{getLevelLabel()}</Text>
            </View>
          </View>

          <Text className="text-lg font-bold mb-1">{plan.title}</Text>
          <Text className="text-sm text-gray-600 mb-2">{plan.description}</Text>

          <View className="flex-row items-baseline space-x-2">
            <Text className="text-2xl font-bold text-blue-500">{plan.price}₴</Text>
            {plan.originalPrice && (
                <Text className="text-sm text-gray-500 line-through">{plan.originalPrice}₴</Text>
            )}
            <Text className="text-xs text-gray-500">/ {plan.duration}</Text>
          </View>
        </View>

        <View className="mt-2">
          <View className="flex-row justify-between mb-2">
            <View className="flex-row items-center space-x-1">
              <Dumbbell size={16} color="#666" />
              <Text className="text-sm text-gray-800">{plan.exercises} упражнений</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <View className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <Text className="text-white text-xs font-bold">{plan.workoutsPerWeek}</Text>
              </View>
              <Text className="text-sm text-gray-800">{plan.workoutsPerWeek} раз/неделю</Text>
            </View>
          </View>

          <Text className="text-sm font-semibold mb-1">Что включено:</Text>
          <ScrollView className="max-h-32">
            {plan.features.map((feature, i) => (
                <View key={i} className="flex-row items-center space-x-2 mb-1">
                  <Check size={14} color="#0EA5E9" />
                  <Text className="text-sm text-gray-800">{feature}</Text>
                </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
            className={`mt-3 py-2 rounded-lg items-center ${isPurchased ? "bg-gray-300" : "bg-blue-500"}`}
            disabled={isPurchased}
            onPress={() => onPurchase(plan.id)}
        >
          <Text className={`font-semibold ${isPurchased ? "text-gray-600" : "text-white"}`}>{isPurchased ? "Уже куплено" : "Купить план"}</Text>
        </TouchableOpacity>
      </View>
  );
};

export default PlanCard;