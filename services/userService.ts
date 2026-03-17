import { api } from "./api";
import { ENDPOINTS } from "@/config/endpoints";

export interface UserDTO {
  id: number;
  login: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  role: "ADMIN" | "TRAINER" | "CLIENT";
  phoneNumber?: string;
  telegramId?: number;
  telegramPhoto?: string;
  imageId?: number;
  birthday?: string;
  settings?: any;
}

export const userService = {
  // Получить текущего пользователя
  async getMe(): Promise<UserDTO> {
    const response = await api.post<UserDTO>(ENDPOINTS.users.me);
    return response.data;
  },
  // Обновить пользователя
  async update(user: UserDTO): Promise<void> {
    await api.put(ENDPOINTS.users.root, user);
  },
};
