import { api } from "./api";

export interface TrainingDetailDTO {
  id?: number;
  set: number;
  weight: number;
  repetition: number;
}

export interface TrainingDetailCreateDTO {
  set: number;
  weight: number;
  repetition: number;
}

export interface ExerciseDTO {
  id: number;
  name: string;
  muscleGroup: {
    id: number;
    name: string;
  };
}

export interface TrainingDTO {
  id: number;
  exercise: ExerciseDTO;
  trainingDetails: TrainingDetailDTO[];
  note: string;
}

export interface TrainingCreateDTO {
  exercise: ExerciseDTO;
  trainingDetails: TrainingDetailCreateDTO[];
  note: string;
}

export interface TrainingDayDTO {
  id?: number;
  date: Date;
  name: string;
  trainings: TrainingDTO[];
  createdDate?: Date;
  modifiedDate?: Date;
  createdBy?: number;
  modifiedBy?: number;
  status: "CREATED" | "IN_PROGRESS" | "COMPLETED";
  startTime?: Date;
  endTime?: Date;
  durationMinutes?: number;
}

export interface TrainingDayCreateDTO {
  date: Date;
  name: string;
  trainings: TrainingCreateDTO[];
  status: "CREATED" | "IN_PROGRESS" | "COMPLETED";
  durationMinutes?: number;
}

export const trainingDayService = {
  // Получить все тренировочные дни
  async getAll(): Promise<TrainingDayDTO[]> {
    const response = await api.get<TrainingDayDTO[]>("/training-days/bulk");
    return response.data;
  },

  // Получить тренировочный день по ID
  async getById(id: number): Promise<TrainingDayDTO> {
    const response = await api.get<TrainingDayDTO>(`/training-days/${id}`);
    return response.data;
  },

  // Получить тренировочные дни по месяцу и году
  async getByMonth(month: number, year: number): Promise<TrainingDayDTO[]> {
    const response = await api.get<TrainingDayDTO[]>(
      `/training-days/${month}/${year}`,
    );
    return response.data;
  },

  // Создать тренировочный день
  async create(trainingDay: TrainingDayCreateDTO): Promise<TrainingDayDTO> {
    const response = await api.post<TrainingDayDTO>(
      "/training-days",
      trainingDay,
    );
    return response.data;
  },

  // Обновить тренировочный день
  async update(trainingDay: TrainingDayDTO): Promise<TrainingDayDTO> {
    const response = await api.put<TrainingDayDTO>(
      "/training-days",
      trainingDay,
    );
    return response.data;
  },

  // Удалить тренировочный день
  async delete(id: number): Promise<void> {
    await api.delete(`/training-days/${id}`);
  },

  // Создать тренировку для клиента (тренером)
  async createTrainingForClient(
    clientId: number,
    trainingDay: TrainingDayCreateDTO,
  ): Promise<TrainingDayDTO> {
    const response = await api.post<TrainingDayDTO>(
      `/training-days/trainer/${clientId}`,
      trainingDay,
    );
    return response.data;
  },

  // Обновить тренировку клиента (тренером)
  async updateTrainingForClient(
    trainingDay: TrainingDayDTO,
  ): Promise<TrainingDayDTO> {
    const response = await api.put<TrainingDayDTO>(
      "/training-days/trainer",
      trainingDay,
    );
    return response.data;
  },

  async getLatestThree(): Promise<TrainingDayDTO[]> {
    const response = await api.get<TrainingDayDTO[]>("/training-days/latest");
    return response.data;
  },
};
