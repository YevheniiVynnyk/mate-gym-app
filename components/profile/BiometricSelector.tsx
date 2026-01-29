import React, { useEffect, useState } from "react";
import { Alert, Switch, Text, View } from "react-native";
import { biometricService } from "@/services/biometricService";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

export default function BiometricSelector() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBiometric = async () => {
      try {
        const available = await biometricService.isAvailable();
        setIsAvailable(available);

        if (available) {
          const type = await biometricService.getBiometricType();
          setBiometricType(type);
          const enabled = await biometricService.isEnabled();
          setIsEnabled(enabled);
        }
      } catch (error) {
        console.error("Error checking biometric:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      checkBiometric();
    }
  }, [user]);

  const handleToggle = async (value: boolean) => {
    if (!user) {
      Alert.alert("Ошибка", "Необходимо войти в аккаунт");
      return;
    }

    if (value) {
      // Включаем биометрию
      try {
        // Проверяем, есть ли уже сохраненные учетные данные
        const existingCredentials = await biometricService.getCredentials();
        if (!existingCredentials) {
          // Если учетных данных нет, предупреждаем пользователя
          Alert.alert(
            "Биометрия включена",
            "Учетные данные будут сохранены при следующем входе с паролем. Для использования биометрии сейчас необходимо войти через форму входа.",
          );
        } else {
          // Если учетные данные есть, можно сразу использовать биометрию
          Alert.alert(
            "Биометрия включена",
            "Теперь вы можете входить через биометрию",
          );
        }
        await biometricService.setEnabled(true);
        setIsEnabled(true);
      } catch (error) {
        Alert.alert("Ошибка", "Не удалось включить биометрию");
        console.error("Error enabling biometric:", error);
      }
    } else {
      // Выключаем биометрию
      try {
        await biometricService.setEnabled(false);
        setIsEnabled(false);
        Alert.alert("Биометрия отключена", "Учетные данные удалены");
      } catch (error) {
        Alert.alert("Ошибка", "Не удалось отключить биометрию");
        console.error("Error disabling biometric:", error);
      }
    }
  };

  // Не показываем, если биометрия недоступна или пользователь не авторизован
  if (!user || !isAvailable || isLoading) {
    return null;
  }

  return (
    <View className="flex-row items-center justify-between py-3 px-2 border-b border-gray-200 dark:border-gray-700 ocean:border-blue-800">
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          {biometricType || "Биометрия"}
        </Text>
        <Text className="text-sm text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70 mt-1">
          Вход по {biometricType.toLowerCase()}
        </Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={handleToggle}
        trackColor={{
          false: "#d1d5db",
          true: "#4ADE80",
        }}
        thumbColor={isEnabled ? "#fff" : "#f3f4f6"}
      />
    </View>
  );
}
