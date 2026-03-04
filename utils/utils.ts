import { Training, TrainingDetail } from "@/types/trainingDay";

// Генерируем временный ID для новых упражнений
const generateTempId = () => -Date.now() - Math.floor(Math.random() * 1000);

export const createEmptyTraining = (): Training => ({
  id: generateTempId(), // Временный уникальный ID
  exercise: { id: 0, name: "", muscleGroup: { id: 0, name: "" } },
  trainingDetails: [{ id: generateTempId(), set: 1, weight: 0, repetition: 0 }],
  note: "",
});

export const updateTrainingField = <K extends keyof Training>(
  trainings: Training[],
  trainingId: number,
  field: K,
  value: Training[K],
): Training[] =>
  trainings.map((t) => (t.id === trainingId ? { ...t, [field]: value } : t));

export const updateSetData = (
  trainings: Training[],
  trainingId: number,
  setIndex: number,
  field: "weight" | "repetition",
  value: number,
) =>
  trainings.map((t) => {
    if (t.id === trainingId) {
      const updatedDetails = [...t.trainingDetails];
      updatedDetails[setIndex] = {
        ...updatedDetails[setIndex],
        [field]: value,
      };
      return { ...t, trainingDetails: updatedDetails };
    }
    return t;
  });

export const updateSetsCount = (
  trainings: Training[],
  trainingId: number,
  newSets: number,
) => {
  return trainings.map((t) => {
    if (t.id !== trainingId) return t;

    const currentSets = t.trainingDetails || [];
    const updatedSets = [...currentSets];

    if (newSets > currentSets.length) {
      const lastSet = currentSets[currentSets.length - 1] || {
        weight: 0,
        repetition: 0,
      };
      for (let i = currentSets.length; i < newSets; i++) {
        updatedSets.push({
          ...lastSet,
          set: i + 1,
          id: generateTempId(), // Временный ID для новых подходов
        });
      }
    } else if (newSets < currentSets.length) {
      updatedSets.length = newSets;
    }

    return { ...t, trainingDetails: updatedSets };
  });
};

export const calculateTotals = (details: TrainingDetail[]) => {
  const totalReps = details.reduce((sum, d) => sum + d.repetition, 0);
  const totalWeight = details.reduce(
    (sum, d) => sum + d.repetition * d.weight,
    0,
  );
  return { totalReps, totalWeight };
};

export const getExerciseDisplayInfo = (exercise: any) => {
  if (exercise.setData && exercise.setData.length > 0) {
    const firstSet = exercise.setData[0];
    return {
      sets: exercise.sets,
      reps: firstSet.reps,
      weight: firstSet.weight,
    };
  }
  return {
    sets: exercise.sets || 0,
    reps: exercise.reps || 0,
    weight: exercise.weight || 0,
  };
};

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
};
