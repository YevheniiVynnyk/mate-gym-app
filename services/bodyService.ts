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
  async getAll(): Promise<BodyDTO[]> {
    const response = await api.get<BodyDTO[]>(ENDPOINTS.body.bulk);
    return response.data;
  },

  // Получить запись по ID
  async getById(id: number): Promise<BodyDTO> {
    const response = await api.get<BodyDTO>(`${ENDPOINTS.body.root}/${id}`);
    return response.data;
  },

  // Получить текущую запись
  async getCurrent(): Promise<BodyDTO> {
    const response = await api.get<BodyDTO>(ENDPOINTS.body.me);
    return response.data;
  },

  // Создать запись о теле
  async create(body: BodyCreateDTO): Promise<void> {
    await api.post(ENDPOINTS.body.root, body);
  },

  // Обновить запись о теле
  async update(body: BodyDTO): Promise<void> {
    await api.put(ENDPOINTS.body.root, body);
  },

  // Удалить запись о теле
  async delete(id: number): Promise<void> {
    await api.delete(`${ENDPOINTS.body.root}/${id}`);
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
