import { ProgressPageData } from "@/types/progress";
import dayjs from "dayjs";

export const mockProgressService = {
  getProgressData: async (): Promise<ProgressPageData> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      weightHistory: [
        { id: 1, date: "2023-01-01", weight: 85, bmi: 26.5 },
        { id: 2, date: "2023-02-01", weight: 84, bmi: 26.2 },
        { id: 3, date: "2023-03-01", weight: 82, bmi: 25.6 },
        { id: 4, date: "2023-04-01", weight: 81, bmi: 25.3 },
        { id: 5, date: "2023-05-01", weight: 80, bmi: 25.0 },
        { id: 6, date: "2023-06-01", weight: 79, bmi: 24.7 },
      ],
      volumeHistory: [
        { date: "Week 1", volume: 5000 },
        { date: "Week 2", volume: 6500 },
        { date: "Week 3", volume: 6000 },
        { date: "Week 4", volume: 8000 },
        { date: "Week 5", volume: 9500 },
      ],
      personalRecords: [
        {
          exerciseId: 1,
          exerciseName: "Bench Press",
          weight: 100,
          date: "2023-05-15",
          previousWeight: 95,
        },
        {
          exerciseId: 2,
          exerciseName: "Squat",
          weight: 140,
          date: "2023-06-01",
          previousWeight: 130,
        },
        {
          exerciseId: 3,
          exerciseName: "Deadlift",
          weight: 180,
          date: "2023-06-10",
          previousWeight: 170,
        },
      ],
      bodyMeasurements: [
        { date: "2023-01-01", chest: 100, waist: 90, biceps: 35 },
        { date: "2023-06-01", chest: 105, waist: 85, biceps: 38 },
      ],
      activityHeatmap: Array.from({ length: 100 }).map((_, i) => ({
        date: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
        count: Math.random() > 0.7 ? 1 : 0,
      })),
      muscleDistribution: [
        { muscleGroupName: "Chest", percentage: 30, color: "#ef4444" },
        { muscleGroupName: "Back", percentage: 25, color: "#3b82f6" },
        { muscleGroupName: "Legs", percentage: 25, color: "#22c55e" },
        { muscleGroupName: "Shoulders", percentage: 10, color: "#eab308" },
        { muscleGroupName: "Arms", percentage: 10, color: "#a855f7" },
      ],
      goals: [
        { id: 1, title: "Target Weight", current: 79, target: 75, unit: "kg" },
        { id: 2, title: "Yearly Workouts", current: 45, target: 100, unit: "" },
      ],
    };
  },
};
