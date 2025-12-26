import { api } from "./api";

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
    const response = await api.get<ExerciseDTO[]>("/exercise");
    return response.data;
  },

  // Получить упражнение по ID
  async getById(id: number): Promise<ExerciseDTO> {
    const response = await api.get<ExerciseDTO>(`/exercise/${id}`);
    return response.data;
  },

  // Получить упражнения по группе мышц
  async getByMuscleGroup(muscleGroupId: number): Promise<ExerciseDTO[]> {
    const response = await api.get<ExerciseDTO[]>(
      `/exercise/muscle-groups/${muscleGroupId}`,
    );
    return response.data;
  },

  // Обновить упражнение
  async update(exercise: ExerciseDTO): Promise<void> {
    await api.put("/exercise", exercise);
  },
};

export const muscleGroupService = {
  // Получить все группы мышц
  async getAll(): Promise<MuscleGroupDTO[]> {
    const response = await api.get<MuscleGroupDTO[]>("/muscleGroup");
    return response.data;
  },

  // Получить группу мышц по ID
  async getById(id: number): Promise<MuscleGroupDTO> {
    const response = await api.get<MuscleGroupDTO>(`/muscleGroup/${id}`);
    return response.data;
  },
};
