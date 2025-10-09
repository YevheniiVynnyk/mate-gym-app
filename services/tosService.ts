import api from './api';

export interface TosContent {
  id: number;
  version: string;
  content: string;
  publishedAt: string;
}

export const tosService = {
  // Получить текущее соглашение
  async getCurrent(): Promise<TosContent> {
    const response = await api.get<TosContent>('/tos/current');
    return response.data;
  },

  // Проверить принял ли пользователь соглашение
  async checkAccepted(userId: number): Promise<boolean> {
    const response = await api.get<boolean>(`/tos/accepted?userId=${userId}`);
    return response.data;
  },

  // Принять пользовательское соглашение
  async accept(userId: number): Promise<void> {
    await api.post(`/tos/accept?userId=${userId}`);
  },
};