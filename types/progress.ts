// Ответ от /api/progress
export interface ProgressSummaryDTO {
  muscleDistribution: MuscleDistributionDTO[];
  activityHeatmap: ActivityHeatmapDTO[];
  personalRecord: PersonalRecordDTO[]; // Исправлено с personalRecords
}

// Ответ от /api/chart/weight и /api/chart/bmi
export interface ChartPointDTO {
  date: string;
  value: number;
}

// --- Детализированные типы ---

export interface WeightHistoryDTO {
  id: number;
  date: string;
  weight: number;
  bmi: number;
}

export interface VolumeHistoryDTO {
  date: string;
  volume: number;
}

export interface PersonalRecordDTO {
  exerciseId: number;
  exerciseName: string;
  weight: number;
  date: string;
  previousWeight?: number;
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
  date: string;
  count: number;
}

export interface MuscleDistributionDTO {
  muscleGroupName: string;
  percentage: number;
  color: string;
}

export interface GoalDTO {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string;
}

// --- Агрегированные данные для UI ---
export interface ProgressPageData {
  weightHistory: ChartPointDTO[];
  bmiHistory: ChartPointDTO[];
  summary: ProgressSummaryDTO;
}
