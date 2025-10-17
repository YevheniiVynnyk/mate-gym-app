import { api } from './api';

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
    status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED';
    startTime?: Date;
    endTime?: Date;
    durationMinutes?: number;
}

export interface TrainingDayCreateDTO {
    date: Date;
    name: string;
    trainings: TrainingCreateDTO[];
    status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED';
    durationMinutes?: number;
}

export const trainingDayService = {
    // Получить все тренировочные дни
    async getAllTrainingDays(): Promise<TrainingDayDTO[]> {
        const response = await api.get<TrainingDayDTO[]>('/trainingDay/all');
        return response.data;
    },

    // Получить тренировочный день по ID
    async getTrainingDayById(id: number): Promise<TrainingDayDTO> {
        const response = await api.get<TrainingDayDTO>(`/trainingDay/${id}`);
        return response.data;
    },

    // Получить тренировочные дни по месяцу и году
    async getTrainingDaysByMonth(month: number, year: number): Promise<TrainingDayDTO[]> {
        const response = await api.get<TrainingDayDTO[]>(`/trainingDay/${month}/${year}`);
        return response.data;
    },

    // Создать тренировочный день
    async createTrainingDay(trainingDay: TrainingDayCreateDTO): Promise<void> {
        console.log(trainingDay);
        await api.post('/trainingDay', trainingDay);
    },

    // Обновить тренировочный день
    async updateTrainingDay(trainingDay: TrainingDayDTO): Promise<void> {
        await api.put('/trainingDay', trainingDay);
    },

    // Удалить тренировочный день
    async deleteTrainingDay(id: number): Promise<void> {
        await api.delete(`/trainingDay/${id}`);
    },

    // Создать тренировку для клиента (тренером)
    async createTrainingForClient(
        clientId: number,
        trainingDay: TrainingDayCreateDTO,
    ): Promise<void> {
        await api.post(`/trainingDay/trainer/${clientId}`, trainingDay);
    },

    // Обновить тренировку клиента (тренером)
    async updateTrainingForClient(trainingDay: TrainingDayDTO): Promise<void> {
        await api.put('/trainingDay/trainer', trainingDay);
    },

    // Создать несколько тренировочных дней
    async createTrainingDays(trainingDays: TrainingDayCreateDTO[]): Promise<void> {
        await api.post('/trainingDay/all', trainingDays);
    },

    // Обновить несколько тренировочных дней
    async updateTrainingDays(trainingDays: TrainingDayDTO[]): Promise<void> {
        await api.put('/trainingDay/all', trainingDays);
    },

    // Удалить несколько тренировочных дней
    async deleteTrainingDays(ids: number[]): Promise<void> {
        await api.delete('/trainingDay/all', { data: ids });
    },

    async getLatestThree(): Promise<TrainingDayDTO[]> {
        const response = await api.get<TrainingDayDTO[]>('/trainingDay/latest');
        return response.data;
    },
};
