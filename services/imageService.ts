import api from './api';

export const imageService = {
	// Загрузить изображение
	async upload(file: File): Promise<number> {
		const formData = new FormData();
		formData.append('file', file);

		const response = await api.post<number>('/images/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	},

	// Получить изображение по ID
	async get(id: number): Promise<Blob> {
		const response = await api.get(`/images/${id}`, {
			responseType: 'blob',
		});
		return response.data;
	},

	// Получить URL изображения
	getUrl(id: number): string {
		return `${api.defaults.baseURL}/images/${id}`;
	},
};