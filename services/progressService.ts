import { api } from "./api";
import { ENDPOINTS } from "@/config/endpoints";
import { ProgressSummaryDTO } from "@/types/progress";

export const progressService = {
  // Получить сводку прогресса
  async getSummary(): Promise<ProgressSummaryDTO> {
    const response = await api.get<ProgressSummaryDTO>(ENDPOINTS.progress.root);
    return response.data;
  },
};
