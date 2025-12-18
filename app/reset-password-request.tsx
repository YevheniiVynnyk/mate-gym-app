import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import CustomInput from "@/components/welcome/CustomInput";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { authService } from "@/services/authService";
import { ChevronLeft } from "lucide-react-native";

export default function ResetPasswordRequest() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      Alert.alert(t("resetPassword.enterEmail"));
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      Alert.alert(
        t("resetPassword.emailSentTitle"),
        t("resetPassword.emailSentMessage"),
      );
      router.back();
    } catch (e) {
      Alert.alert(
        t("resetPassword.errorTitle"),
        (e as Error).message || t("resetPassword.errorMessage"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 px-4 pt-6 justify-center">
      {/* 🔙 Навигация назад */}
      <TouchableOpacity
        onPress={() => router.back()}
        disabled={isLoading}
        className="flex-row items-center py-2 self-start"
        activeOpacity={0.7}
      >
        <ChevronLeft size={22} className="text-muted-foreground" />
        <Text className="ml-1 text-base font-medium text-muted-foreground">
          {t("common.back")}
        </Text>
      </TouchableOpacity>

      {/* Заголовок */}
      <Text className="text-2xl font-bold m-2 text-foreground text-center">
        {t("resetPassword.title")}
      </Text>

      <Text className="text-sm text-muted-foreground m-2">
        {t("resetPassword.subtitle")}
      </Text>

      <CustomInput
        placeholder={t("resetPassword.email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleSend}
        disabled={isLoading}
        activeOpacity={0.8}
        className={`bg-primary rounded-xl p-4 mt-4 ${isLoading ? "opacity-60" : ""}`}
      >
        <Text className="text-center text-white text-base font-semibold">
          {isLoading ? t("resetPassword.sending") : t("resetPassword.send")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
