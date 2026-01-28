import { Repository } from "typeorm/browser";
import { AppDataSource } from "../data-source";
import { SyncQueue, SyncAction } from "../entities/SyncQueue";
import { TrainingDay } from "../entities/TrainingDay";

const ENTITY_TRAINING_DAY = "TRAINING_DAY";
const ENTITY_PROFILE = "PROFILE";

class SyncQueueService {
  private repo: Repository<SyncQueue>;

  constructor() {
    this.repo = AppDataSource.getRepository(SyncQueue);
  }

  /**
   * Общий upsert по правилам:
   * CREATE→UPDATE: остаётся CREATE, обновляем payload
   * CREATE→DELETE: удаляем запись
   * UPDATE→UPDATE: перезаписываем payload
   * UPDATE→DELETE: меняем action на DELETE
   * (нет записи) -> добавляем
   */
  async upsert(
    entityType: string,
    entityClientId: string,
    action: SyncAction,
    payload: any,
  ): Promise<void> {
    const existing = await this.repo.findOne({
      where: { entityType, entityClientId },
    });

    const now = Date.now();
    const payloadJson = payload ? JSON.stringify(payload) : null;

    if (!existing) {
      // новая запись
      const record = this.repo.create({
        entityType,
        entityClientId,
        action,
        payloadJson,
        updatedAt: now,
      });
      await this.repo.save(record);
      return;
    }

    // Правила
    if (existing.action === "CREATE" && action === "UPDATE") {
      existing.payloadJson = payloadJson;
      existing.updatedAt = now;
      await this.repo.save(existing);
      return;
    }

    if (existing.action === "CREATE" && action === "DELETE") {
      await this.repo.delete(existing.id);
      return;
    }

    if (existing.action === "UPDATE" && action === "UPDATE") {
      existing.payloadJson = payloadJson;
      existing.updatedAt = now;
      await this.repo.save(existing);
      return;
    }

    if (existing.action === "UPDATE" && action === "DELETE") {
      existing.action = "DELETE";
      existing.payloadJson = payloadJson;
      existing.updatedAt = now;
      await this.repo.save(existing);
      return;
    }

    // По умолчанию перезаписываем
    existing.action = action;
    existing.payloadJson = payloadJson;
    existing.updatedAt = now;
    await this.repo.save(existing);
  }

  async getAll(): Promise<SyncQueue[]> {
    return this.repo.find({ order: { updatedAt: "ASC" } });
  }

  async deleteByIds(ids: number[]): Promise<void> {
    if (!ids.length) return;
    await this.repo.delete(ids);
  }

  // Специализированные методы
  async queueTrainingDay(
    action: SyncAction,
    trainingDay: Partial<TrainingDay>,
  ): Promise<void> {
    const clientId = String(trainingDay.id ?? trainingDay.clientId ?? "");
    if (!clientId) return;
    await this.upsert(ENTITY_TRAINING_DAY, clientId, action, trainingDay);
  }

  async queueProfileUpdate(userId: number, payload: any): Promise<void> {
    await this.upsert(ENTITY_PROFILE, String(userId), "UPDATE", payload);
  }
}

export const syncQueueService = new SyncQueueService();
export const SYNC_ENTITY_TYPES = {
  TRAINING_DAY: ENTITY_TRAINING_DAY,
  PROFILE: ENTITY_PROFILE,
};
