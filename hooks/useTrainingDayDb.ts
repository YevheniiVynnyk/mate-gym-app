import { useState } from "react";
import {
  exerciseDbService,
  muscleGroupDbService,
  trainingDayDbService,
} from "@/database";
import { TrainingDay } from "@/database/entities/TrainingDay";
import { Exercise } from "@/database/entities/Exercise";
import { MuscleGroup } from "@/database/entities/MuscleGroup";

export const useTrainingDayDb = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Muscle Groups
  const getAllMuscleGroups = async (): Promise<MuscleGroup[]> => {
    setLoading(true);
    setError(null);
    try {
      return await muscleGroupDbService.getAll();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Exercises
  const getAllExercises = async (): Promise<Exercise[]> => {
    setLoading(true);
    setError(null);
    try {
      return await exerciseDbService.getAll();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getExercisesByMuscleGroup = async (
    muscleGroupId: number,
  ): Promise<Exercise[]> => {
    setLoading(true);
    setError(null);
    try {
      return await exerciseDbService.getByMuscleGroup(muscleGroupId);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Training Days
  const getAllTrainingDays = async (): Promise<TrainingDay[]> => {
    setLoading(true);
    setError(null);
    try {
      return await trainingDayDbService.getAll();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTrainingDayById = async (
    id: number,
  ): Promise<TrainingDay | null> => {
    setLoading(true);
    setError(null);
    try {
      return await trainingDayDbService.getById(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const getTrainingDaysByMonth = async (
  //   month: number,
  //   year: number,
  // ): Promise<TrainingDay[]> => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     return await trainingDayDbService.(month, year);
  //   } catch (err) {
  //     const error = err instanceof Error ? err : new Error(String(err));
  //     setError(error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const createTrainingDay = async (data: {
    name: string;
    date: Date;
    status?: "CREATED" | "IN_PROGRESS" | "COMPLETED";
    durationMinutes?: number;
    clientId?: string;
    trainerId?: string;
    isTemplate?: boolean;
    createdBy?: number;
  }): Promise<TrainingDay> => {
    setLoading(true);
    setError(null);
    try {
      return await trainingDayDbService.create(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAllMuscleGroups,
    getAllExercises,
    getExercisesByMuscleGroup,
    getAllTrainingDays,
    getTrainingDayById,
    // getTrainingDaysByMonth,
    createTrainingDay,
  };
};
