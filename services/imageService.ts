import { api } from './api';

export const imageService = {
    // Загрузить изображение
    /*async upload(file: File): Promise<number> {
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
	},/*/
    // Теперь принимаем 'fileData' как any, чтобы учесть URI/объект из ImagePicker
    /*async upload(fileData: any): Promise<number> {
        const formData = new FormData();
        
        // 🛠️ Ключевое изменение: FormData для React Native и Expo Web
        // Expo/React Native требует, чтобы файл был в формате { uri, name, type }
        // Если вы на React Native/Expo, 'fileData' должен быть объектом:
        if (typeof fileData === 'object' && fileData.uri) {
             formData.append('file', {
                uri: fileData.uri,
                type: fileData.type || 'image/jpeg', // Укажите правильный тип MIME
                name: fileData.name || fileData.uri.split('/').pop(),
            } as any);
        } else {
             // Для обычного Web (если ImagePicker возвращает File/Blob)
             formData.append('file', fileData);
        }

        const response = await api.post<number>('/images/upload', formData, {
            // Заголовок 'Content-Type' при использовании FormData обычно не нужен, 
            // так как Axios/браузер устанавливает его автоматически с нужным boundary.
            // Но можно оставить для ясности:
            headers: {
                // ВАЖНО: При использовании FormData в React Native НЕ устанавливайте этот заголовок вручную! 
                // Если вы на Expo Web/браузере, можете оставить.
                // 'Content-Type': 'multipart/form-data', 
            },
        });
        return response.data;
    },
*/
    async upload(fileData: any): Promise<number> {
        // fileData - це об'єкт {uri, type, name}
        const formData = new FormData();

        // Тут має бути логіка формування formData, як ми обговорювали раніше:
        // Це забезпечує сумісність з URI, отриманим від expo-image-picker
        if (fileData.uri) {
            formData.append('file', {
                uri: fileData.uri,
                type: fileData.type || 'image/jpeg',
                name: fileData.name || 'photo.jpg',
            } as any);
        } else {
            formData.append('file', fileData); // Для звичайного File API (наприклад, на Web)
        }

        // КЛЮЧОВЕ ЗМІНЕННЯ: НЕ ПЕРЕДАЄМО Content-Type вручну!
        // Axios/браузер/React Native сам встановить правильний
        // Content-Type: multipart/form-data з правильним boundary.
        const response = await api.post<number>('/images/upload', formData, {
            // Видаліть блок headers: {...} повністю або переконайтеся,
            // що там немає Content-Type: 'application/json'
            headers: {},
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
