import { Training, TrainingDetail } from "@/types/trainingDay";

let tempIdCounter = Date.now();

export const generateTempId = () => tempIdCounter--;

export const createEmptyTraining = (): Training => ({
  id: generateTempId(),
  exercise: { id: null, name: "", muscleGroup: { id: null, name: "" } },
  trainingDetails: [{ id: null, set: 1, weight: 0, repetition: 0 }],
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
  sets: number,
) =>
  trainings.map((t) => {
    if (t.id === trainingId) {
      const updatedDetails = Array.from(
        { length: sets },
        (_, i) =>
          t.trainingDetails[i] || {
            id: null,
            set: i + 1,
            weight: 0,
            repetition: 0,
          },
      );
      return { ...t, trainingDetails: updatedDetails };
    }
    return t;
  });

export const calculateTotals = (details: TrainingDetail[]) => {
  const totalReps = details.reduce((sum, d) => sum + d.repetition, 0);
  const totalWeight = details.reduce(
    (sum, d) => sum + d.repetition * d.weight,
    0,
  );
  return { totalReps, totalWeight };
};
// Helper function to get exercise display info
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
