// New TrainingDay structure
export interface TrainingDetail {
	id: number;
	set: number;
	weight: number;
	repetition: number;
}

export interface MuscleGroup {
	id: number;
	name: string;
}

export interface Exercise {
	id: number;
	name: string;
	description?: string;
	muscleGroup: MuscleGroup;
}

export interface Training {
	id: number;
	exercise: Exercise;
	trainingDetails: TrainingDetail[];
	note: string;
}

export interface TrainingDay {
	id: number;
	name: string;
	trainings: Training[];
	durationMinutes?: number;
	date: Date;
	status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED';
	clientId?: string;
	trainerId?: string;
	isTemplate?: boolean;
	createdDate?: Date;
	modifiedDate?: Date;
	createdBy?: number;
	modifiedBy?: number;
	startTime?: Date;
	endTime?: Date;
}

export interface TrainingDayTemplate {
	id: string;
	name: string;
	exercises: Exercise[];
	createdBy: string;
	isPublic: boolean;
}

export interface TrainingDaySession {
	date: string;
	time: string;
	duration: number;
	status: 'scheduled' | 'completed' | 'cancelled';
	location: string;
	trainings: Training[];
}
