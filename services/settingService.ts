import api from './api';

export interface NotificationDTO {
    id: number;
    botMessages: boolean;
    botNewsNotifications: boolean;
    trainingAlarm: boolean;
    adsNotifications: boolean;
}

export interface SettingDTO {
    id: number;
    theme: 'LIGHT' | 'NIGHT' | 'CLASSIC';
    language: 'UKR' | 'RUS' | 'ENG';
    notification: NotificationDTO;
}

export const settingService = {
    // Получить настройки
    async getSettings(): Promise<SettingDTO> {
        const response = await api.get<SettingDTO>('/setting');
        return response.data;
    },

    // Обновить настройки
    async updateSettings(settings: SettingDTO): Promise<void> {
        await api.put('/setting', settings);
    },
};
