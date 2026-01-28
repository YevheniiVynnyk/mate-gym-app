import { Repository } from "typeorm/browser";
import { AppDataSource } from "../data-source";
import { TrainingDay } from "../entities/TrainingDay";
import { syncQueueService } from "./syncQueueService";

export class TrainingDayDbService {
  private repo: Repository<TrainingDay>;

  constructor() {
    this.repo = AppDataSource.getRepository(TrainingDay);
  }

  getAll(): Promise<TrainingDay[]> {
    return this.repo.find({
      relations: [
        "trainings",
        "trainings.exercise",
        "trainings.exercise.muscleGroup",
        "trainings.trainingDetails",
      ],
      order: { date: "DESC" },
    });
  }

  getById(id: number): Promise<TrainingDay | null> {
    return this.repo.findOne({
      where: { id },
      relations: [
        "trainings",
        "trainings.exercise",
        "trainings.exercise.muscleGroup",
        "trainings.trainingDetails",
      ],
    });
  }

  async create(data: Partial<TrainingDay>): Promise<TrainingDay> {
    const entity = this.repo.create({
      ...data,
      status: data.status ?? "CREATED",
      createdDate: new Date(),
    });
    const saved = await this.repo.save(entity);
    await syncQueueService.queueTrainingDay("CREATE", saved);
    return saved;
  }

  async update(
    id: number,
    updates: Partial<TrainingDay>,
  ): Promise<TrainingDay> {
    await this.repo.update(id, { ...updates, modifiedDate: new Date() });
    const updated = await this.getById(id);
    if (!updated) throw new Error(`TrainingDay ${id} not found`);
    await syncQueueService.queueTrainingDay("UPDATE", updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
    await syncQueueService.queueTrainingDay("DELETE", { id } as TrainingDay);
  }
}

export const trainingDayDbService = new TrainingDayDbService();
