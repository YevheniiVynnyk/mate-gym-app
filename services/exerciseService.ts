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
    const response = await api.get<ExerciseDTO>(ENDPOINTS.exercises.byId);
    return response.data;
  },

  // Получить упражнения по группе мышц
  async getByMuscleGroup(muscleGroupId: number): Promise<ExerciseDTO[]> {
    const response = await api.get<ExerciseDTO[]>(
      ENDPOINTS.exercises.byMuscleGroup,
      {
        params: { muscleGroupId },
      },
    );
    return response.data;
  },
};
