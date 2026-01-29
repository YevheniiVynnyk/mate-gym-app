import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";
import { Platform } from "react-native";

// Google OAuth конфигурация
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

// Получаем redirect URI
const getRedirectUri = () => {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "mategymapp",
    path: "oauth",
  });
  return redirectUri;
};

export interface GoogleAuthResult {
  idToken: string;
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}

export const googleAuthService = {
  /**
   * Авторизация через Google
   * Возвращает idToken и информацию о пользователе
   */
  async signInWithGoogle(): Promise<GoogleAuthResult> {
    try {
      // Генерируем случайную строку для state
      const state = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Math.random().toString(),
      );

      const redirectUri = getRedirectUri();

      // Настройки запроса
      const request = new AuthSession.AuthRequest({
        clientId: Platform.select({
          ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
          android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
          default: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
        })!,
        scopes: ["openid", "profile", "email"],
        responseType: AuthSession.ResponseType.Token,
        redirectUri,
        state,
        extraParams: {},
        additionalParameters: {},
      });

      // Запускаем авторизацию
      const result = await request.promptAsync(discovery, {
        useProxy: Platform.OS === "web",
        showInRecents: true,
      });

      if (result.type === "success") {
        const { access_token, id_token } = result.params;

        if (!id_token || !access_token) {
          throw new Error("Не удалось получить токены от Google");
        }

        // Получаем информацию о пользователе
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
        );
        const userInfo = await userInfoResponse.json();

        return {
          idToken: id_token,
          accessToken: access_token,
          user: {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          },
        };
      } else if (result.type === "error") {
        throw new Error(
          result.error?.message || "Ошибка авторизации через Google",
        );
      } else {
        throw new Error("Авторизация отменена");
      }
    } catch (error) {
      console.error("Google auth error:", error);
      throw error;
    }
  },
};
