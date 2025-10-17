import api from "./api";

export const imageService = {
	// ✅ Загрузка изображения
	async upload(file: { uri: string; type: string; name: string }): Promise<number> {
		const formData = new FormData();

		formData.append("file", {
			uri: file.uri,
			type: file.type,
			name: file.name,
		} as any); // <- важное изменение: используем объект формата RN

		const response = await api.post<number>("/images/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	},

	// 🔹 Получить изображение как Blob
	async getBlob(id: number): Promise<Blob> {
		const response = await api.get(`/images/${id}`, {
			responseType: 'blob',
		});
		return response.data;
	},

	// 🔹 Получить изображение как base64 (для React Native)
	async getBase64(id: number): Promise<string> {
		const blob = await this.getBlob(id);

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64data = reader.result as string;
				resolve(base64data);
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	},

	// 🔹 Получить URL изображения
	getUrl(id: number): string {
		return `${api.defaults.baseURL}/images/${id}`;
	},

};