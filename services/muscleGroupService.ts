import { api } from "./api";
import { ENDPOINTS } from "@/config/endpoints";

export interface MuscleGroupDTO {
  id: number;
  name: string;
}

export const muscleGroupService = {
  // Получить все группы мышц
  async getAll(): Promise<MuscleGroupDTO[]> {
    const response = await api.get<MuscleGroupDTO[]>(
      ENDPOINTS.muscleGroups.bulk,
    );
    return response.data;
  },

  // Получить группу мышц по ID
  async getById(id: number): Promise<MuscleGroupDTO> {
    const response = await api.get<MuscleGroupDTO>(
      ENDPOINTS.muscleGroups.byId,
      {
        params: { id },
      },
    );
    return response.data;
  },
};
