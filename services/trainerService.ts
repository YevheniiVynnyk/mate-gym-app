import { api } from "./api";
import { UserDTO } from "./userService";

export interface Trainer {
  id: number;
  user: UserDTO;
  averageRating: number;
  ratingsCount: number;
  subscribersCount: number;
}

export interface ClientDTO {
  id: number;
  userDTO: UserDTO;
  preferredWorkoutTime?: string;
}

export const trainerService = {
  // Получить всех тренеров
  async getAllTrainers(): Promise<Trainer[]> {
    const response = await api.get<Trainer[]>("/trainer");
    return response.data;
  },

  // Получить тренера по ID
  async getTrainerById(id: number): Promise<Trainer> {
    const response = await api.get<Trainer>(`/trainer/${id}`);
    return response.data;
  },

  // Поиск тренеров
  async searchTrainers(term: string): Promise<Trainer[]> {
    const response = await api.get<Trainer[]>("/trainer/search", {
      params: { term },
    });
    return response.data;
  },

  // Получить всех клиентов тренера
  async getAllClients(): Promise<ClientDTO[]> {
    const response = await api.get<ClientDTO[]>("/trainer/clients");
    return response.data;
  },

  // Создать тренера
  async createTrainer(trainer: Omit<Trainer, "id">): Promise<void> {
    await api.post("/trainer", trainer);
  },

  // Обновить тренера
  async updateTrainer(trainer: Trainer): Promise<void> {
    await api.put("/trainer", trainer);
  },

  // Удалить тренера
  async deleteTrainer(id: number): Promise<void> {
    await api.delete(`/trainer/${id}`);
  },

  // Создать несколько тренеров
  async createTrainers(trainers: Omit<Trainer, "id">[]): Promise<void> {
    await api.post("/trainer/all", trainers);
  },

  // Обновить несколько тренеров
  async updateTrainers(trainers: Trainer[]): Promise<void> {
    await api.put("/trainer/all", trainers);
  },

  // Удалить несколько тренеров
  async deleteTrainers(ids: number[]): Promise<void> {
    await api.delete("/trainer/all", { data: ids });
  },
};
