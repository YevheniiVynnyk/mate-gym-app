import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Token } from "@/services/authService";
import { networkStatus } from "@/utils/networkStatus";
import ENV from "@/config/env";

export const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

/**
 * Безопасно получает токен из AsyncStorage
 */
export const getStoredToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  try {
    const tokenData = await AsyncStorage.getItem("token");
    if (!tokenData) return null;

    const parsed = JSON.parse(tokenData);
    if (parsed?.accessToken && parsed?.refreshToken) return parsed;

    return null;
  } catch (err) {
    console.warn("Не удалось получить токен:", err);
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    // Если мы точно знаем, что сети нет, сразу отклоняем запрос
    if (!networkStatus.getOnlineStatus()) {
      return Promise.reject({
        message: "No internet connection",
        isNetworkError: true,
      });
    }

    try {
      const token = await getStoredToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
      }
    } catch (err) {
      console.warn("Не удалось установить токен в заголовки:", err);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response && error.code !== "ECONNABORTED") {
      console.warn("Network error detected via API failure.");
      networkStatus.setOnline(false);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Попытка обновить токен...");
        const token = await getStoredToken();
        if (token) {
          const { data: refreshToken } = await axios.post<Token>(
            `${ENV.API_URL}/auth/refresh`,
            token,
          );

          console.log("✅ Токен обновлён");
          networkStatus.setOnline(true);

          await AsyncStorage.setItem("token", JSON.stringify(refreshToken));
          originalRequest.headers.Authorization = `Bearer ${refreshToken.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);

        if (axios.isAxiosError(refreshError) && !refreshError.response) {
          networkStatus.setOnline(false);
          return Promise.reject(refreshError);
        }

        // Если не удалось обновить токен, не удаляем его, просто отклоняем запрос
        // AuthContext сам переведет в UNAUTHENTICATED
      }
    }

    return Promise.reject(error);
  },
);

export default api;
