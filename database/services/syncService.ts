import { api } from "@/services/api";
import { syncQueueService } from "./syncQueueService";
import { SyncQueue } from "../entities/SyncQueue";

interface SyncItemPayload {
  entityType: string;
  action: string;
  clientId: string;
  updatedAt: string; // ISO string
  payload: any;
}

const SYNC_ENDPOINT = "/sync"; // предполагаемый эндпоинт

class SyncService {
  async syncAll(): Promise<void> {
    const items = await syncQueueService.getAll();
    if (!items.length) return;

    const payloadItems: SyncItemPayload[] = items.map((item: SyncQueue) => ({
      entityType: item.entityType,
      action: item.action,
      clientId: item.entityClientId,
      updatedAt: new Date(item.updatedAt).toISOString(),
      payload: item.payloadJson ? JSON.parse(item.payloadJson) : null,
    }));

    try {
      await api.post(SYNC_ENDPOINT, { items: payloadItems });
      // удаляем синхронизированные записи
      await syncQueueService.deleteByIds(items.map((i) => i.id));
      console.log("✅ Синхронизация завершена, записей отправлено:", items.length);
    } catch (error) {
      console.error("❌ Ошибка при синхронизации, очередь сохранена:", error);
    }
  }
}

export const syncService = new SyncService();
