# Database Setup with TypeORM and SQLite

This directory contains the TypeORM configuration and entities for local SQLite database storage.

## Structure

```
database/
├── entities/           # TypeORM entity definitions
│   ├── MuscleGroup.ts
│   ├── Exercise.ts
│   ├── TrainingDay.ts
│   ├── Training.ts
│   └── TrainingDetail.ts
├── services/          # Database service layer
│   └── trainingDayDbService.ts
├── data-source.ts     # TypeORM DataSource configuration
└── index.ts          # Exports
```

## Entities

### MuscleGroup
- `id`: Primary key
- `name`: Unique muscle group name
- `exercises`: One-to-many relationship with Exercise

### Exercise
- `id`: Primary key
- `name`: Exercise name
- `description`: Optional description
- `muscleGroup`: Many-to-one relationship with MuscleGroup
- `trainings`: One-to-many relationship with Training

### TrainingDay
- `id`: Primary key
- `name`: Training day name
- `date`: Date of the training
- `status`: CREATED | IN_PROGRESS | COMPLETED
- `durationMinutes`: Optional duration
- `trainings`: One-to-many relationship with Training

### Training
- `id`: Primary key
- `exercise`: Many-to-one relationship with Exercise
- `note`: Optional note
- `trainingDay`: Many-to-one relationship with TrainingDay
- `trainingDetails`: One-to-many relationship with TrainingDetail

### TrainingDetail
- `id`: Primary key
- `set`: Set number
- `weight`: Weight used
- `repetition`: Number of repetitions
- `training`: Many-to-one relationship with Training

## Usage

### Initialize Database

The database is automatically initialized when the app starts (in `app/_layout.tsx`).

### Using the Service

```typescript
import { trainingDayDbService } from "@/database";

// Get all muscle groups
const muscleGroups = await trainingDayDbService.getAllMuscleGroups();

// Get all exercises
const exercises = await trainingDayDbService.getAllExercises();

// Get exercises by muscle group
const chestExercises = await trainingDayDbService.getExercisesByMuscleGroup(1);

// Create a training day
const trainingDay = await trainingDayDbService.createTrainingDay({
  name: "Chest Day",
  date: new Date(),
  status: "CREATED",
});

// Get training days by month
const januaryTrainings = await trainingDayDbService.getTrainingDaysByMonth(1, 2024);

// Add training to training day
const training = await trainingDayDbService.addTrainingToTrainingDay(
  trainingDay.id,
  exerciseId,
  "Focus on form"
);

// Add training detail (set)
const detail = await trainingDayDbService.addTrainingDetail(
  training.id,
  1, // set number
  80, // weight
  10  // repetitions
);
```

## Direct Repository Access

You can also use TypeORM repositories directly:

```typescript
import { AppDataSource } from "@/database";
import { Exercise } from "@/database/entities/Exercise";

const exerciseRepository = AppDataSource.getRepository(Exercise);
const exercises = await exerciseRepository.find({
  relations: ["muscleGroup"],
});
```

## Notes

- The database uses `synchronize: true` in development, which automatically creates/updates tables.
- In production, you should use migrations instead of synchronize.
- All relationships use CASCADE delete where appropriate.
- The database file is stored at: `SQLite/mate_gym.db` in the app's document directory.
