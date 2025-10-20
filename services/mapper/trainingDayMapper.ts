import { TrainingDay } from "@/types/trainingDay.ts";
import {
  TrainingDayCreateDTO,
  TrainingDayDTO,
} from "@/services/trainingDayService.ts";

export const mapToCreateDTO = (
  localData: TrainingDay,
): TrainingDayCreateDTO => {
  return {
    name: localData.name,
    date: localData.date,
    status: localData.status,
    trainings: localData.trainings.map((training) => ({
      exercise: {
        id: training.exercise.id,
        name: training.exercise.name,
        muscleGroup: {
          id: training.exercise.muscleGroup.id,
          name: training.exercise.muscleGroup.name,
        },
      },
      trainingDetails: training.trainingDetails.map((trainingDetail) => ({
        set: trainingDetail.set,
        weight: trainingDetail.weight,
        repetition: trainingDetail.repetition,
      })),
      note: training.note,
    })),
    durationMinutes: localData.durationMinutes,
  };
};

export const mapToUpdateDTO = (localData: TrainingDay): TrainingDayDTO => {
  return {
    id: localData.id,
    name: localData.name,
    date: localData.date,
    status: localData.status,
    createdBy: parseInt(localData.clientId || "0"),
    modifiedBy: parseInt(localData.trainerId || "0"),
    createdDate: new Date(), // можно заменить, если приходит с сервера
    modifiedDate: new Date(),
    trainings: localData.trainings.map((training) => ({
      id: training.id,
      exercise: {
        id: training.exercise.id || 0,
        name: training.exercise.name,
        muscleGroup: {
          id: training.exercise.muscleGroup.id,
          name: training.exercise.muscleGroup.name,
        },
      },
      trainingDetails: training.trainingDetails.map((trainingDetail) => ({
        id: trainingDetail.id,
        set: trainingDetail.set,
        weight: trainingDetail.weight,
        repetition: trainingDetail.repetition,
      })),
      note: training.note,
    })),
    durationMinutes: localData.durationMinutes,
  };
};

export const mapFromAPI = (apiData: TrainingDayDTO): TrainingDay => {
  return {
    id: apiData.id,
    name: apiData.name,
    date: new Date(apiData.date), // исправлено apiData -> localData
    trainings: apiData.trainings.map((training) => ({
      id: training.id,
      exercise: {
        id: training.exercise.id,
        name: training.exercise.name,
        muscleGroup: {
          id: training.exercise.muscleGroup.id,
          name: training.exercise.muscleGroup.name,
        },
      },
      trainingDetails: training.trainingDetails.map(
        (trainingDetail, index) => ({
          id: trainingDetail.id,
          set: index + 1,
          weight: trainingDetail.weight,
          repetition: trainingDetail.repetition,
        }),
      ),
      note: training.note,
    })),
    status: apiData.status,
    durationMinutes: apiData.durationMinutes,
  };
};
