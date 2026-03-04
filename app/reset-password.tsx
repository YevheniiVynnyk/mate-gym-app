import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "@/components/login/CustomInput";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { authService } from "@/services/authService";
import { useNavigation } from "@/hooks/useNavigation";

export default function ResetPasswordNew() {
  const { t } = useTranslation();
  const router = useNavigation();
  const { token } = useLocalSearchParams<{ token: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  // Проверка токена при монтировании
  useEffect(() => {
    if (!token) {
      Alert.alert(
        t("resetPasswordNew.errorTitle"),
        t("resetPasswordNew.missingToken") || "Token is missing",
        [
          {
            text: t("resetPasswordNew.ok"),
            onPress: () => router.toAuth(),
          },
        ],
      );
    }
    setIsCheckingToken(false);
  }, [token, router, t]);

  const handleSubmit = async () => {
    if (!password) return Alert.alert(t("resetPasswordNew.enterNewPassword"));
    if (!confirmPassword)
      return Alert.alert(t("resetPasswordNew.enterConfirmPassword"));
    if (password !== confirmPassword)
      return Alert.alert(t("resetPasswordNew.mismatch"));
    if (!token)
      return Alert.alert(t("resetPasswordNew.errorTitle"), "Token is missing");

    setIsLoading(true);
    try {
      await authService.resetPassword({ token, password });
      Alert.alert(
        t("resetPasswordNew.successTitle"),
        t("resetPasswordNew.successMessage"),
      );
      router.toAuth(); // перенаправление на Auth
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      Alert.alert(t("resetPasswordNew.errorTitle"), message);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || !password || !confirmPassword;

  if (isCheckingToken) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>
          {t("resetPasswordNew.checkingToken") || "Checking token..."}
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 24,
          gap: 20,
        }}
      >
        {/* Кнопка назад */}
        <TouchableOpacity onPress={() => router.toAuth()} className="mb-6">
          <Text className="text-blue-600 font-semibold">
            {t("common.back") || "← На главную"}
          </Text>
        </TouchableOpacity>

        <Text className="text-lg font-semibold mb-6">
          {t("resetPasswordNew.title")}
        </Text>

        <CustomInput
          placeholder={t("resetPasswordNew.newPassword")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={{ marginBottom: 16 }}
        />

        <CustomInput
          placeholder={t("resetPasswordNew.confirmPassword")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          style={{ marginBottom: 20 }}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className={`bg-primary rounded-lg p-4 mt-4 ${isButtonDisabled ? "opacity-50" : ""}`}
          disabled={isButtonDisabled}
        >
          <Text className="text-center text-white font-semibold">
            {isLoading
              ? t("resetPasswordNew.submitting")
              : t("resetPasswordNew.submit")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
