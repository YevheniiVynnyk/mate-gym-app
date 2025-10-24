import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Building, Check, Dumbbell, Home, Star } from "lucide-react-native";

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

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onPurchase,
  isPurchased = false,
}) => {
  // Адаптивные классы
  const cardBg = "bg-card dark:bg-gray-800 ocean:bg-ocean-card";
  const borderClass =
    "border-border dark:border-gray-700 ocean:border-ocean-border";
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const textMutedFg =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70";
  const primaryBg = "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";
  const primaryText =
    "text-primary dark:text-primary-400 ocean:text-ocean-primary";
  const primaryFgText = "text-primary-foreground dark:text-white";
  const mutedBg = "bg-muted dark:bg-gray-700 ocean:bg-ocean-muted";

  const getEquipmentIcon = () => {
    // ✅ Иконки теперь используют Muted Foreground
    const iconClass = textMutedFg;
    switch (plan.equipmentType) {
      case "home":
        return <Home size={18} className={iconClass} />;
      case "basic-gym":
        return <Dumbbell size={18} className={iconClass} />;
      case "full-gym":
        return <Building size={18} className={iconClass} />;
      default:
        return <Dumbbell size={18} className={iconClass} />;
    }
  };

  const getEquipmentLabel = () => {
    switch (plan.equipmentType) {
      case "home":
        return "Дом/Улица";
      case "basic-gym":
        return "Малый зал";
      case "full-gym":
        return "Полный зал";
      default:
        return "Не указано";
    }
  };

  const getLevelLabel = () => {
    switch (plan.level) {
      case "beginner":
        return "Начинающий";
      case "intermediate":
        return "Средний";
      case "advanced":
        return "Продвинутый";
      default:
        return "Не указано";
    }
  };

  const getLevelColors = () => {
    // ✅ Адаптивные цвета для бейджей уровней
    switch (plan.level) {
      case "beginner":
        return {
          bg: "bg-green-100/30 dark:bg-green-800/50 ocean:bg-green-700/50",
          text: "text-green-800 dark:text-green-300 ocean:text-green-300",
        };
      case "intermediate":
        return {
          bg: "bg-yellow-100/30 dark:bg-yellow-800/50 ocean:bg-yellow-700/50",
          text: "text-yellow-800 dark:text-yellow-300 ocean:text-yellow-300",
        };
      case "advanced":
        return {
          bg: "bg-red-100/30 dark:bg-red-800/50 ocean:bg-red-700/50",
          text: "text-red-800 dark:text-red-300 ocean:text-red-300",
        };
      default:
        return {
          bg: "bg-muted dark:bg-gray-700",
          text: "text-foreground dark:text-gray-100",
        };
    }
  };

  const levelColors = getLevelColors();

  return (
    // ✅ Адаптивный фон, граница и тень
    <View
      className={`${cardBg} rounded-xl p-4 mb-4 shadow-lg border ${borderClass}
        ${plan.popular ? "border-2 border-primary dark:border-primary-400 ocean:border-ocean-primary" : ""}`}
    >
      {plan.popular && (
        // ✅ Адаптивный фон для метки "Популярный"
        <View
          className={`absolute -top-2 left-1/2 transform -translate-x-1/2 flex-row items-center ${primaryBg} px-3 py-1 rounded-full`}
        >
          <Star
            size={14}
            className="text-primary-foreground dark:text-white mr-1"
          />
          <Text className={`${primaryFgText} text-xs font-semibold`}>
            Популярный
          </Text>
        </View>
      )}

      <View className="mb-2">
        <View className="flex-row justify-between mb-2">
          {/* Инвентарь */}
          <View className="flex-row items-center space-x-1">
            {getEquipmentIcon()}
            {/* ✅ Адаптивный текст */}
            <Text className={`text-sm ${textMutedFg}`}>
              {getEquipmentLabel()}
            </Text>
          </View>
          {/* Уровень */}
          <View className={`${levelColors.bg} px-2 py-1 rounded-lg`}>
            <Text className={`text-xs font-semibold ${levelColors.text}`}>
              {getLevelLabel()}
            </Text>
          </View>
        </View>

        {/* Заголовок и описание */}
        <Text className={`text-lg font-bold mb-1 ${textFg}`}>{plan.title}</Text>
        <Text className={`text-sm mb-2 ${textMutedFg}`}>
          {plan.description}
        </Text>

        {/* Цена */}
        <View className="flex-row items-baseline space-x-2">
          {/* ✅ Адаптивный основной цвет для цены */}
          <Text className={`text-2xl font-bold ${primaryText}`}>
            {plan.price}₴
          </Text>
          {plan.originalPrice && (
            // ✅ Адаптивный текст
            <Text className={`text-sm line-through ${textMutedFg}`}>
              {plan.originalPrice}₴
            </Text>
          )}
          {/* ✅ Адаптивный текст */}
          <Text className={`text-xs ${textMutedFg}`}>/ {plan.duration}</Text>
        </View>
      </View>

      <View className="mt-2">
        <View className="flex-row justify-between mb-2">
          {/* Кол-во упражнений */}
          <View className="flex-row items-center space-x-1">
            {/* ✅ Адаптивный цвет для иконки */}
            <Dumbbell size={16} className={textMutedFg} />
            <Text className={`text-sm ${textFg}`}>
              {plan.exercises} упражнений
            </Text>
          </View>
          {/* Тренировок в неделю */}
          <View className="flex-row items-center space-x-1">
            {/* ✅ Адаптивный фон для бейджа */}
            <View
              className={`w-5 h-5 rounded-full ${primaryBg} flex items-center justify-center`}
            >
              <Text className={`${primaryFgText} text-xs font-bold`}>
                {plan.workoutsPerWeek}
              </Text>
            </View>
            <Text className={`text-sm ${textFg}`}>
              {plan.workoutsPerWeek} раз/неделю
            </Text>
          </View>
        </View>

        {/* Список особенностей */}
        <Text className={`text-sm font-semibold mb-1 ${textFg}`}>
          Что включено:
        </Text>
        <ScrollView className="max-h-32">
          {plan.features.map((feature, i) => (
            <View key={i} className="flex-row items-center space-x-2 mb-1">
              {/* ✅ Адаптивный основной цвет для галочки */}
              <Check size={14} className={primaryText} />
              <Text className={`text-sm ${textFg}`}>{feature}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Кнопка покупки */}
      <TouchableOpacity
        className={`mt-3 py-2 rounded-lg items-center transition-all 
          ${
            isPurchased
              ? // ✅ Адаптивный фон для купленной/недоступной кнопки
                mutedBg
              : // ✅ Адаптивный фон для активной кнопки
                primaryBg
          }`}
        disabled={isPurchased}
        onPress={() => onPurchase(plan.id)}
      >
        <Text
          className={`font-semibold 
            ${
              isPurchased
                ? // ✅ Адаптивный цвет для текста купленной кнопки
                  textMutedFg
                : // ✅ Адаптивный цвет для текста активной кнопки
                  primaryFgText
            }`}
        >
          {isPurchased ? "Уже куплено" : "Купить план"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanCard;
