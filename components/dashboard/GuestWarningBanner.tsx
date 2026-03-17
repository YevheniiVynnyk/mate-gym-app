import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AlertTriangle, ChevronRight, X } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export const GuestWarningBanner = () => {
  const { showGuestWarning, setShowGuestWarning } = useAuth();
  const router = useRouter();

  if (!showGuestWarning) {
    return null;
  }

  return (
    <View className="bg-yellow-400/20 dark:bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-4 mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-row flex-1">
          <AlertTriangle size={20} className="text-yellow-500 mr-3 mt-0.5" />
          <View className="flex-1">
            <Text className="text-base font-bold text-yellow-600 dark:text-yellow-400">
              Guest Session Expiring
            </Text>
            <Text className="text-sm text-yellow-700/80 dark:text-yellow-500/80 mt-1">
              Your guest data will be lost soon. Sign up to save your progress.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setShowGuestWarning(false)}
          className="p-1 -mr-1 -mt-1"
        >
          <X size={18} className="text-yellow-600/70 dark:text-yellow-500/70" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/auth")}
        className="bg-yellow-400/80 dark:bg-yellow-500/80 py-2 px-4 rounded-lg mt-4 self-start flex-row items-center"
      >
        <Text className="text-black font-bold text-sm">Sign Up Now</Text>
        <ChevronRight size={16} className="text-black ml-1" />
      </TouchableOpacity>
    </View>
  );
};
