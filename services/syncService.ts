import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDbService, syncQueueService } from "@/database";
import { userService } from "@/services/userService";
import { fromUserDTO } from "@/services/mapper/userMapper";
import { trainingDayService } from "@/services/trainingDayService";
import { trainingDayDbService } from "@/database/services/trainingDayDbService";

export const syncService = {
  /**
   * Syncs local data with the server.
   * This function should be called when the app comes back online.
   */
  syncData: async () => {
    console.log("🔄 Starting data synchronization...");

    try {
      // 1. Sync User Data (Always first to ensure valid token/user context)
      const userData = await userService.getMe();
      const mappedUser = fromUserDTO(userData);
      await userDbService.syncFromServer(mappedUser);
      console.log("✅ User data synced");

      // 2. Process Sync Queue
      const pendingTasks = await syncQueueService.getPendingTasks();
      console.log(`Found ${pendingTasks.length} pending tasks`);

      for (const task of pendingTasks) {
        try {
          if (task.type === "TrainingDay") {
            const payload = task.payload ? JSON.parse(task.payload) : null;

            if (task.action === "CREATE") {
              // Create on server
              const created = await trainingDayService.create(payload);
              // Update local entity with serverId
              if (created && created.id) {
                await trainingDayDbService.updateServerId(
                  task.clientId,
                  created.id,
                );
              }
            } else if (task.action === "UPDATE") {
              if (task.serverId) {
                // Ensure payload has the correct server ID
                payload.id = task.serverId;
                await trainingDayService.update(payload);
              } else {
                console.warn("Cannot update entity without serverId", task);
              }
            } else if (task.action === "DELETE") {
              if (task.serverId) {
                await trainingDayService.delete(task.serverId);
              } else {
                console.warn("Cannot delete entity without serverId", task);
              }
            }
          }

          // If successful, remove from queue
          await syncQueueService.removeTask(task.id);
          console.log(
            `✅ Task ${task.id} (${task.action} ${task.type}) processed`,
          );
        } catch (taskError) {
          console.error(`❌ Failed to process task ${task.id}`, taskError);
          // Stop processing queue on error to maintain order consistency
          // We will retry next time syncData is called
          break;
        }
      }

      console.log("✅ Data synchronization completed");
    } catch (error) {
      console.error("❌ Data synchronization failed", error);
      throw error;
    }
  },
};
