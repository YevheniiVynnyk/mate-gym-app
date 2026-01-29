import { api } from "./api";
import { ENDPOINTS } from "@/config/endpoints";

export interface BodyDTO {
  id: number;
  weight: number;
  height: number;
  bmi: number;
  date: Date;
}

export interface BodyCreateDTO {
  date: Date;
  weight: number;
  height: number;
}

export interface ChartDataDTO {
  date: string;
  value: number;
}

export const bodyService = {
  // Получить все записи о теле
  async getAllBodyRecords(): Promise<BodyDTO[]> {
    const response = await api.get<BodyDTO[]>(ENDPOINTS.body.root);
    return response.data;
  },

  // Получить запись по ID
  async getBodyRecordById(id: number): Promise<BodyDTO> {
    const response = await api.get<BodyDTO>(ENDPOINTS.body.byId);
    return response.data;
  },

  // Получить текущую запись
  async getCurrentBodyRecord(): Promise<BodyDTO> {
    const response = await api.get<BodyDTO>(ENDPOINTS.body.me);
    return response.data;
  },

  // Создать запись о теле
  async createBodyRecord(body: BodyCreateDTO): Promise<void> {
    await api.post(ENDPOINTS.body.root, body);
  },

  // Обновить запись о теле
  async updateBodyRecord(body: BodyDTO): Promise<void> {
    await api.put(ENDPOINTS.body.root, body);
  },

  // Удалить запись о теле
  async deleteBodyRecord(id: number): Promise<void> {
    await api.delete(ENDPOINTS.body.root, {
      params: { id },
    });
  },

  // Создать несколько записей
  async createBodyRecords(bodies: BodyCreateDTO[]): Promise<void> {
    await api.post(ENDPOINTS.body.bulk, bodies);
  },
};

export const chartService = {
  // Получить данные графика веса
  async getWeightChart(): Promise<ChartDataDTO[]> {
    const response = await api.get<ChartDataDTO[]>(ENDPOINTS.chart.weight);
    return response.data;
  },

  // Получить данные графика BMI
  async getBMIChart(): Promise<ChartDataDTO[]> {
    const response = await api.get<ChartDataDTO[]>(ENDPOINTS.chart.bmi);
    return response.data;
  },
};
