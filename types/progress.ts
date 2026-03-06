export interface WeightHistoryDTO {
  id: number;
  date: string;
  weight: number;
  bmi: number;
}

export interface VolumeHistoryDTO {
  date: string; // "2023-W40" или "2023-10"
  volume: number; // Общий тоннаж
}

export interface PersonalRecordDTO {
  exerciseId: number;
  exerciseName: string;
  weight: number;
  date: string;
  previousWeight?: number; // Для сравнения
}

export interface BodyMeasurementDTO {
  date: string;
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thigh?: number;
}

export interface ActivityHeatmapDTO {
  date: string; // YYYY-MM-DD
  count: number; // Количество тренировок (обычно 1)
}

export interface MuscleDistributionDTO {
  muscleGroupName: string;
  percentage: number; // 0-100
  color: string; // Цвет для графика
}

export interface GoalDTO {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string; // "kg", "workouts", "km"
}

export interface ProgressPageData {
  weightHistory: WeightHistoryDTO[];
  volumeHistory: VolumeHistoryDTO[];
  personalRecords: PersonalRecordDTO[];
  bodyMeasurements: BodyMeasurementDTO[];
  activityHeatmap: ActivityHeatmapDTO[];
  muscleDistribution: MuscleDistributionDTO[];
  goals: GoalDTO[];
}
