import { api } from "./api";

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

export const authService = {
  // Вход в систему
  async signIn(data: SignInRequest): Promise<Token> {
    const response = await api.post<Token>("/auth/signin", data);
    return response.data;
  },

  // Регистрация
  async signUp(data: SignUpRequest): Promise<Token> {
    const response = await api.post<Token>("/auth/signup", data);
    return response.data;
  },

  // Обновление токена
  async refresh(refreshToken: string): Promise<Token> {
    const response = await api.post<Token>("/auth/refresh", refreshToken);
    return response.data;
  },

  // Вход через Telegram
  async signInTelegram(data: TelegramUserRequest): Promise<Token> {
    const response = await api.post<Token>("/auth/telegram", data);
    return response.data;
  },
};
