import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { biometricService } from "@/services/biometricService";
import { useAuth } from "@/contexts/AuthContext";
import { Fingerprint, X } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface BiometricPromptProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BiometricPrompt: React.FC<BiometricPromptProps> = ({
  visible,
  onSuccess,
  onCancel,
}) => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [biometricType, setBiometricType] = useState<string>("");

  useEffect(() => {
    const getType = async () => {
      const type = await biometricService.getBiometricType();
      setBiometricType(type);
    };
    if (visible) {
      getType();
    }
  }, [visible]);

  const handleBiometricAuth = async () => {
    try {
      const credentials = await biometricService.loginWithBiometric();
      if (credentials) {
        // Используем сохраненные учетные данные для входа
        // login уже сохранит учетные данные для биометрии, если она включена
        await login(credentials.login, credentials.password);
        onSuccess();
      } else {
        Alert.alert("Ошибка", "Биометрическая аутентификация не удалась");
      }
    } catch (error: any) {
      console.error("Biometric login error:", error);
      const errorMessage =
        error?.message || "Не удалось войти через биометрию";
      
      // Если ошибка связана с отсутствием учетных данных, не показываем Alert
      if (errorMessage.includes("не найдены") || errorMessage.includes("не включена")) {
        onCancel();
        return;
      }
      
      Alert.alert("Ошибка", errorMessage);
    }
  };

  const cardBg =
    "bg-card dark:bg-gray-800 ocean:bg-ocean-card";
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const textMuted =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70";

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className={`${cardBg} rounded-2xl p-6 w-full max-w-sm`}>
          <View className="items-center mb-4">
            <View className="bg-primary/10 dark:bg-primary-600/20 ocean:bg-ocean-primary/20 p-4 rounded-full mb-4">
              <Fingerprint
                size={48}
                color={
                  theme === "ocean"
                    ? "#33c9ff"
                    : theme === "dark"
                      ? "#4ADE80"
                      : "#4ADE80"
                }
              />
            </View>
            <Text className={`text-xl font-bold mb-2 ${textFg}`}>
              Вход через {biometricType}
            </Text>
            <Text className={`text-sm text-center ${textMuted}`}>
              Используйте {biometricType.toLowerCase()} для входа в приложение
            </Text>
          </View>

          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              className="flex-1 bg-gray-200 dark:bg-gray-700 ocean:bg-ocean-muted py-3 rounded-lg"
              onPress={onCancel}
            >
              <Text className={`text-center font-semibold ${textFg}`}>
                Отмена
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-primary dark:bg-primary-600 ocean:bg-ocean-primary py-3 rounded-lg"
              onPress={handleBiometricAuth}
            >
              <Text className="text-center font-semibold text-white">
                Войти
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
