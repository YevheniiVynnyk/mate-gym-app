import api from "./api";

export interface MonthlyProgress {
	month: string;
	TrainingDays: number;
	hours: number;
	weight: number;
}

export interface ExerciseProgress {
	name: string;
	current: number;
	start: number;
	goal: number;
	unit: string;
}

export interface WeeklyActivity {
	day: string;
	completed: boolean;
	duration: number;
}

export interface FavoriteExercise {
	name: string;
	frequency: number;
	percentage: number;
}

export const analyticsService = {
	async getMonthlyProgress(): Promise<MonthlyProgress[]> {
		const {data} = await api.get('/statistics/monthly');
		return data;
	},

	async getExerciseProgress(): Promise<ExerciseProgress[]> {
		const {data} = await api.get('/statistics/exercises');
		return data;
	},

	async getWeeklyActivity(): Promise<WeeklyActivity[]> {
		const {data} = await api.get('/statistics/weekly');
		return data;
	},

	async getFavoriteExercises(): Promise<FavoriteExercise[]> {
		const {data} = await api.get('/statistics/favorites');
		return data;
	},
};