import { api } from "./api";

export interface StatDTO {
  id: number;
  date: string;
  user: any;
  exercise: any;
  tonnage: number;
  trainingId: number;
}

export interface StatCreateDTO {
  date: string;
  user: any;
  exercise: any;
  tonnage: number;
  trainingId: number;
}

export interface QuickStatDTO {
  totalTrainings: number;
  completedTrainings: number;
  totalTimeMinutes: number;
  averageDurationMinutes: number;
}

export interface StatProgressDTO {
  progressData: { [key: string]: number };
}

export interface StatisticsExerciseDTO {
  totalSets: number;
  totalReps: number;
  avgWeight: number;
  maxWeight: number;
  weightProgress: number;
  lastExerciseDate: string;
}

export interface StatisticsMuscleGroupDTO {
  totalWorkouts: number;
  totalExercises: number;
  avgWeight: number;
  maxWeight: number;
  avgReps: number;
  avgSets: number;
  lastWorkoutDate: string;
}

export type TimeFrame = "WEEK" | "MONTH" | "YEAR";

// --- новые DTO ---
export interface WeeklyActivityDTO {
  day: string;
  completed: boolean;
}

export interface FavoriteExerciseDTO {
  name: string;
  frequency: number;
  percentage: number;
}

export interface FavoriteMuscleGroupDTO {
  name: string;
  totalWorkouts: number;
  percentage: number;
}

export const statisticsService = {
  // Получить все статистики
  async getAllStatistics(): Promise<StatDTO[]> {
    const response = await api.get<StatDTO[]>("/statistics");
    return response.data;
  },

  // Получить быструю статистику
  async getQuickStatistics(): Promise<QuickStatDTO> {
    const response = await api.get<QuickStatDTO>("/statistics/quick");
    return response.data;
  },

  // Создать статистику
  async createStatistic(stat: StatCreateDTO): Promise<void> {
    await api.post("/statistics", stat);
  },

  // Обновить статистику
  async updateStatistic(stat: StatDTO): Promise<void> {
    await api.put("/statistics", stat);
  },

  // Удалить статистику
  async deleteStatistic(id: number): Promise<void> {
    await api.delete(`/statistics/${id}`);
  },

  // Получить статистику по упражнению
  async getExerciseStatistics(id: number): Promise<StatisticsExerciseDTO> {
    const response = await api.get<StatisticsExerciseDTO>(
      `/statistics/exercise/${id}`
    );
    return response.data;
  },

  // Получить прогресс по упражнению
  async getExerciseProgress(
    id: number,
    timeframe: TimeFrame
  ): Promise<StatProgressDTO> {
    const response = await api.get<StatProgressDTO>(
      `/statistics/exercise-progress/${id}/${timeframe}`
    );
    return response.data;
  },

  // Получить статистику по группе мышц
  async getMuscleGroupStatistics(
    id: number
  ): Promise<StatisticsMuscleGroupDTO> {
    const response = await api.get<StatisticsMuscleGroupDTO>(
      `/statistics/muscle-group/${id}`
    );
    return response.data;
  },

  // Получить прогресс по группе мышц
  async getMuscleGroupProgress(
    id: number,
    timeframe: TimeFrame
  ): Promise<StatProgressDTO> {
    const response = await api.get<StatProgressDTO>(
      `/statistics/muscle-progress/${id}/${timeframe}`
    );
    return response.data;
  },

  // --- новые методы ---
  async getWeeklyStats(): Promise<WeeklyActivityDTO[]> {
    const response = await api.get<WeeklyActivityDTO[]>("/statistics/weekly");
    return response.data;
  },

  async getFavoriteExercises(): Promise<FavoriteExerciseDTO[]> {
    const response = await api.get<FavoriteExerciseDTO[]>(
      "/statistics/favorites/exercises"
    );
    return response.data;
  },

  async getFavoriteMuscleGroups(): Promise<FavoriteMuscleGroupDTO[]> {
    const response = await api.get<FavoriteMuscleGroupDTO[]>(
      "/statistics/favorites/muscle-groups"
    );
    return response.data;
  },
};
