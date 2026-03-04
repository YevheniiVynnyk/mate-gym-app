import { TrainingDay } from "@/types/trainingDay";
import {
  TrainingDayCreateDTO,
  TrainingDayDTO,
} from "@/services/trainingDayService";

// Хелпер для очистки временных ID (отрицательных)
const cleanId = (id: number | undefined | null) => {
  if (typeof id === "number" && id < 0) return undefined;
  return id || undefined;
};

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
    createdDate: new Date(),
    modifiedDate: new Date(),
    trainings: localData.trainings.map((training) => ({
      id: cleanId(training.id), // Очищаем ID
      exercise: {
        id: training.exercise.id || 0,
        name: training.exercise.name,
        muscleGroup: {
          id: training.exercise.muscleGroup.id,
          name: training.exercise.muscleGroup.name,
        },
      },
      trainingDetails: training.trainingDetails.map((trainingDetail) => ({
        id: cleanId(trainingDetail.id), // Очищаем ID
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
    id: apiData.id || 0,
    name: apiData.name,
    date: new Date(apiData.date),
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
