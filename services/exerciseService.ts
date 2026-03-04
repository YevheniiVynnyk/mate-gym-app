import { api } from "./api";
import { ENDPOINTS } from "@/config/endpoints";

export interface MuscleGroupDTO {
  id: number;
  name: string;
}

export interface ExerciseDTO {
  id: number;
  name: string;
  description: string;
  muscleGroup: MuscleGroupDTO;
}

export const exerciseService = {
  // Получить все упражнения
  async getAll(): Promise<ExerciseDTO[]> {
    const response = await api.get<ExerciseDTO[]>(ENDPOINTS.exercises.bulk);
    return response.data;
  },

  // Получить упражнение по ID
  async getById(id: number): Promise<ExerciseDTO> {
    // Явно используем правильный путь для получения по ID
    const url = `/exercises/${id}`;
    const response = await api.get<ExerciseDTO>(url);
    return response.data;
  },

  // Получить упражнения по группе мышц
  async getByMuscleGroup(muscleGroupId: number): Promise<ExerciseDTO[]> {
    // Явно используем правильный путь, чтобы исключить ошибку в ENDPOINTS
    const url = `/exercises/muscle-groups/${muscleGroupId}`;
    const response = await api.get<ExerciseDTO[]>(url);
    return response.data;
  },
};
