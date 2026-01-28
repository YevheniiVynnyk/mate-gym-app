import "reflect-metadata";
import { DataSource } from "typeorm/browser";
import * as SQLite from "expo-sqlite";

import { MuscleGroup } from "./entities/MuscleGroup";
import { Exercise } from "./entities/Exercise";
import { TrainingDay } from "./entities/TrainingDay";
import { Training } from "./entities/Training";
import { TrainingDetail } from "./entities/TrainingDetail";
import { SyncQueue } from "./entities/SyncQueue";

export const AppDataSource = new DataSource({
  type: "expo",
  driver: SQLite,
  database: "mate_gym.db",
  entities: [
    MuscleGroup,
    Exercise,
    TrainingDay,
    Training,
    TrainingDetail,
    SyncQueue,
  ],
  synchronize: true, // Auto-create tables (set to false in production)
  logging: __DEV__, // Enable logging in development
  migrations: [], // Add migrations if needed
});

// Initialize database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("✅ Database initialized successfully");
    }
  } catch (error) {
    console.error("❌ Error during database initialization:", error);
    throw error;
  }
};

// Close database connection
export const closeDatabase = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("✅ Database connection closed");
    }
  } catch (error) {
    console.error("❌ Error closing database:", error);
    throw error;
  }
};
