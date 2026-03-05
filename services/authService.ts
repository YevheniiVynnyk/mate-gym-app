import { api } from "./api";
import { paths } from "@/config/openapi";
import { ENDPOINTS } from "@/config/endpoints";

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignUpRequest {
  login: string;
  password: string;
  email: string;
  role: string;
}

export interface Token {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
}

export interface TelegramUserRequest {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
}

export interface GoogleSignInRequest {
  idToken: string;
  email: string;
  name: string;
  picture?: string;
}

// --- Типы для сброса пароля ---
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export const authService = {
  // Вход в систему
  async signIn(data: SignInRequest, guestToken?: string): Promise<Token> {
    const config = guestToken ? { headers: { "X-Guest-Token": guestToken } } : {};
    const response = await api.post<Token>(ENDPOINTS.auth.signin, data, config);
    return response.data;
  },

  // Регистрация
  async signUp(data: SignUpRequest, guestToken?: string): Promise<Token> {
    const config = guestToken ? { headers: { "X-Guest-Token": guestToken } } : {};
    const response = await api.post<Token>(ENDPOINTS.auth.signup, data, config);
    return response.data;
  },

  // Обновление токена
  async refresh(refreshToken: string): Promise<Token> {
    const response = await api.post<Token>(
      ENDPOINTS.auth.refresh,
      refreshToken,
    );
    return response.data;
  },

  // Вход через Telegram
  async signInTelegram(data: TelegramUserRequest): Promise<Token> {
    const response = await api.post<Token>(ENDPOINTS.auth.telegram, data);
    return response.data;
  },

  // Вход через Google
  async signInGoogle(data: GoogleSignInRequest): Promise<Token> {
    const response = await api.post<Token>("/auth/google", {
      idToken: data.idToken,
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
    return response.data;
  },

  // Гостевой вход
  async guestLogin(): Promise<Token> {
    const response = await api.post<Token>(ENDPOINTS.auth.guest);
    return response.data;
  },

  // --- Сброс пароля ---
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post(ENDPOINTS.auth.passwordForgot, data);
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post(ENDPOINTS.auth.passwordReset, data);
  },
};
