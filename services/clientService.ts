import { api } from "./api";
import { UserDTO } from "./userService";

export interface ClientDTO {
  id: number;
  userDTO: UserDTO;
  preferredWorkoutTime?: string;
}

export const clientService = {
  // Получить всех клиентов
  async getAllClients(): Promise<ClientDTO[]> {
    const response = await api.get<ClientDTO[]>("/client");
    return response.data;
  },

  // Получить клиента по ID
  async getClientById(id: number): Promise<ClientDTO> {
    const response = await api.get<ClientDTO>(`/client/${id}`);
    return response.data;
  },

  // Создать клиента
  async createClient(client: Omit<ClientDTO, "id">): Promise<void> {
    await api.post("/client", client);
  },

  // Обновить клиента
  async updateClient(client: ClientDTO): Promise<void> {
    await api.put("/client", client);
  },

  // Удалить клиента
  async deleteClient(id: number): Promise<void> {
    await api.delete(`/client/${id}`);
  },

  // Подписаться на тренера
  async subscribeToTrainer(trainerId: number): Promise<void> {
    await api.post(`/client/subscribe/${trainerId}`);
  },

  // Отписаться от тренера
  async unsubscribeFromTrainer(trainerId: number): Promise<void> {
    await api.post(`/client/unsubscribe/${trainerId}`);
  },

  // Оценить тренера
  async rateTrainer(trainerId: number, rating: number): Promise<void> {
    await api.post(`/client/${trainerId}/rate`, null, {
      params: { rating },
    });
  },

  // Получить подписки клиента
  async getSubscriptions(): Promise<number[]> {
    const response = await api.get<number[]>("/client/subscriptions");
    return response.data;
  },

  // Создать несколько клиентов
  async createClients(clients: Omit<ClientDTO, "id">[]): Promise<void> {
    await api.post("/client/all", clients);
  },

  // Обновить несколько клиентов
  async updateClients(clients: ClientDTO[]): Promise<void> {
    await api.put("/client/all", clients);
  },

  // Удалить несколько клиентов
  async deleteClients(ids: number[]): Promise<void> {
    await api.delete("/client/all", { data: ids });
  },
};
