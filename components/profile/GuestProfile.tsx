import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Crown, UserPlus } from "lucide-react-native";
import { useNavigation } from "@/hooks/useNavigation";
import FeaturesList from "@/components/login/FeaturesList";

export default function GuestProfile() {
  const router = useNavigation();

  return (
    <Card className="p-6 w-full items-center mb-6 overflow-hidden border-primary/20 dark:border-primary/20">
      {/* Декоративный фон */}
      <View className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <View className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Иконка короны */}
      <View className="bg-primary/10 p-4 rounded-full mb-4">
        <Crown size={32} className="text-primary dark:text-primary-400" />
      </View>

      <Text className="text-2xl font-bold mb-2 text-center text-foreground dark:text-gray-100">
        Unlock Full Potential
      </Text>
      <Text className="text-base text-center text-muted-foreground dark:text-gray-400 mb-6 px-4">
        Join Mate Gym community to save your progress and access premium features.
      </Text>

      {/* Список фич */}
      <View className="w-full mb-8">
        <FeaturesList />
      </View>

      <TouchableOpacity
        className="bg-primary dark:bg-primary-600 w-full py-4 rounded-xl flex-row justify-center items-center shadow-sm active:opacity-90"
        onPress={() => router.toAuth()}
      >
        <UserPlus size={20} color="white" className="mr-2" />
        <Text className="text-white font-bold text-lg">
          Sign Up or Login
        </Text>
      </TouchableOpacity>
      
      <Text className="text-xs text-center text-muted-foreground mt-4 opacity-60">
        It takes less than a minute
      </Text>
    </Card>
  );
}
