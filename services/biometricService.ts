import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BIOMETRIC_ENABLED_KEY = "biometric_enabled";
const BIOMETRIC_CREDENTIALS_KEY = "biometric_credentials";

export interface BiometricCredentials {
  login: string;
  password: string;
}

export const biometricService = {
  /**
   * Проверяет, доступна ли биометрия на устройстве
   */
  async isAvailable(): Promise<boolean> {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) return false;

      return await LocalAuthentication.isEnrolledAsync();
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      return false;
    }
  },

  /**
   * Получает тип биометрии (Face ID, Touch ID, Fingerprint)
   */
  async getBiometricType(): Promise<string> {
    try {
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
        )
      ) {
        return "Face ID";
      }
      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        return "Touch ID / Fingerprint";
      }
      return "Biometric";
    } catch (error) {
      return "Biometric";
    }
  },

  /**
   * Проверяет, включена ли биометрия в настройках
   */
  async isEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
      return enabled === "true";
    } catch (error) {
      return false;
    }
  },

  /**
   * Включает/выключает биометрию
   */
  async setEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, enabled.toString());
      if (!enabled) {
        // При выключении удаляем сохраненные учетные данные
        await AsyncStorage.removeItem(BIOMETRIC_CREDENTIALS_KEY);
      }
    } catch (error) {
      console.error("Error setting biometric enabled:", error);
      throw error;
    }
  },

  /**
   * Сохраняет учетные данные для биометрического входа
   */
  async saveCredentials(login: string, password: string): Promise<void> {
    try {
      const credentials: BiometricCredentials = { login, password };
      await AsyncStorage.setItem(
        BIOMETRIC_CREDENTIALS_KEY,
        JSON.stringify(credentials),
      );
    } catch (error) {
      console.error("Error saving biometric credentials:", error);
      throw error;
    }
  },

  /**
   * Получает сохраненные учетные данные
   */
  async getCredentials(): Promise<BiometricCredentials | null> {
    try {
      const credentialsJson = await AsyncStorage.getItem(
        BIOMETRIC_CREDENTIALS_KEY,
      );
      if (!credentialsJson) return null;
      return JSON.parse(credentialsJson) as BiometricCredentials;
    } catch (error) {
      console.error("Error getting biometric credentials:", error);
      return null;
    }
  },

  /**
   * Аутентификация через биометрию
   */
  async authenticate(
    promptMessage: string = "Войдите используя биометрию",
  ): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        cancelLabel: "Отмена",
        disableDeviceFallback: false,
        fallbackLabel: "Использовать пароль",
      });

      return result.success;
    } catch (error) {
      console.error("Biometric authentication error:", error);
      return false;
    }
  },

  /**
   * Полный процесс входа через биометрию
   * Проверяет доступность, включенность, аутентифицирует и возвращает учетные данные
   */
  async loginWithBiometric(): Promise<BiometricCredentials | null> {
    try {
      // Проверяем доступность
      const available = await this.isAvailable();
      if (!available) {
        throw new Error("Биометрия недоступна на этом устройстве");
      }

      // Проверяем, включена ли биометрия
      const enabled = await this.isEnabled();
      if (!enabled) {
        throw new Error("Биометрия не включена в настройках");
      }

      // Получаем сохраненные учетные данные
      const credentials = await this.getCredentials();
      if (!credentials) {
        throw new Error("Учетные данные не найдены");
      }

      // Аутентифицируем пользователя
      const authenticated = await this.authenticate(
        "Войдите для доступа к приложению",
      );
      if (!authenticated) {
        return null;
      }

      return credentials;
    } catch (error) {
      console.error("Login with biometric error:", error);
      throw error;
    }
  },
};
