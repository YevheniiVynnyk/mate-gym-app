import {
  exerciseDbService,
  MuscleGroup,
  muscleGroupDbService,
} from "@/database";
import { muscleGroupService } from "@/services/muscleGroupService";
import { exerciseService } from "@/services/exerciseService";

export const initializeExerciseData = async (): Promise<void> => {
  try {
    console.log("🔄 Начало инициализации упражнений и мышечных групп...");

    // Проверяем локальную БД
    const existingExercises = await exerciseDbService.getAll();
    const existingMuscleGroups = await muscleGroupDbService.getAll();
    if (existingExercises.length > 0 && existingMuscleGroups.length > 0) {
      console.log("✅ Данные уже загружены в локальную БД");
      return;
    }

    // Загружаем мышечные группы с сервера
    let muscleGroups: any[] = [];
    try {
      muscleGroups = await muscleGroupService.getAll();
      console.log(`✅ Загружено ${muscleGroups.length} мышечных групп`);
    } catch (error) {
      console.warn("⚠️ Не удалось загрузить мышечные группы с сервера:", error);
    }

    // Сохраняем мышечные группы
    const savedMuscleGroups: MuscleGroup[] = [];
    for (const mg of muscleGroups) {
      try {
        const saved = await muscleGroupDbService.createOrUpdate(mg.id, mg.name);
        savedMuscleGroups.push(saved);
      } catch (error) {
        console.error(`Ошибка при сохранении группы мышц ${mg.name}:`, error);
      }
    }

    // Загружаем упражнения с сервера
    let exercises: any[] = [];
    try {
      exercises = await exerciseService.getAll();
      console.log(`✅ Загружено ${exercises.length} упражнений`);
    } catch (error) {
      console.warn("⚠️ Не удалось загрузить упражнения с сервера:", error);
    }

    // Сохраняем упражнения
    let savedCount = 0;
    for (const ex of exercises) {
      try {
        const muscleGroup = savedMuscleGroups.find(
          (mg) => mg.id === ex.muscleGroup?.id,
        );
        if (muscleGroup) {
          await exerciseDbService.createOrUpdate(
            ex.id,
            ex.name,
            muscleGroup.id,
            ex.description,
          );
          savedCount++;
        }
      } catch (error) {
        console.error(`Ошибка при сохранении упражнения ${ex.name}:`, error);
      }
    }

    console.log(
      `✅ Инициализация завершена: сохранено ${savedCount} упражнений`,
    );
  } catch (error) {
    console.error("❌ Ошибка при инициализации данных:", error);
  }
};
