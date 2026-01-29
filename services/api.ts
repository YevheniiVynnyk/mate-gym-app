import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://mate-gym-api.onrender.com/api";
// const API_URL = "http://192.168.0.102:8080/api";
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Не удалось получить токен:", err);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Попытка обновить токен...");
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (token) {
          const { data: tokenData } = await axios.post(
            `${API_URL}/auth/refresh`,
            token,
          );

          console.log("✅ Токен обновлён");

          await AsyncStorage.setItem("access_token", tokenData.accessToken);
          await AsyncStorage.setItem("refresh_token", tokenData.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`; // <-- ДОБАВЛЕНО
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);
        await AsyncStorage.multiRemove([
          "access_token",
          "refresh_token",
          "fittracker_user",
        ]);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
