import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight, Sparkles, X } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  onPress: () => void;
}

export const OnboardingBanner: React.FC<Props> = ({ onPress }) => {
  const { user, updateUserOnboarding } = useAuth();

  // Не показываем баннер, если:
  // - Нет пользователя
  // - Пользователь - гость
  // - Пользователь уже прошел онбординг (isFirstLogin === false)
  if (!user || user.role === "GUEST" || !user.isFirstLogin) {
    return null;
  }

  const handleDismiss = () => {
    updateUserOnboarding({ isFirstLogin: false });
  };

  return (
    <View className="bg-primary/10 dark:bg-primary-900/20 border border-primary/20 rounded-2xl p-4 mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-row flex-1">
          <View className="bg-primary/20 p-2 rounded-full mr-3">
            <Sparkles size={20} className="text-primary dark:text-primary-400" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground dark:text-gray-100">
              Complete Your Profile
            </Text>
            <Text className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              Tell us about yourself to get personalized workout plans and accurate stats.
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleDismiss} className="p-1 -mr-1 -mt-1">
          <X size={18} className="text-muted-foreground" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={onPress}
        className="bg-primary dark:bg-primary-600 ocean:bg-ocean-primary py-2.5 px-4 rounded-xl mt-4 self-start flex-row items-center shadow-sm"
      >
        <Text className="text-white font-bold text-sm">Setup Profile</Text>
        <ChevronRight size={16} color="white" className="ml-1" />
      </TouchableOpacity>
    </View>
  );
};
