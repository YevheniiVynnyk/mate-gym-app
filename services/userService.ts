import {api} from './api';

export interface UserDTO {
    id: number;
    login: string;
    password?: string;
    email: string;
    firstName: string;
    lastName: string;
    age?: number;
    role: 'ADMIN' | 'TRAINER' | 'CLIENT';
    phoneNumber?: string;
    telegramId?: number;
    telegramPhoto?: string;
    imageId?: number;
    birthday?: string;
    settings?: any;
}

export const userService = {
    // Получить текущего пользователя
    async getMe(): Promise<UserDTO> {
        const response = await api.post<UserDTO>('/user/me');
        return response.data;
    },

    // Получить всех пользователей
    async getAllUsers(): Promise<UserDTO[]> {
        const response = await api.get<UserDTO[]>('/user');
        return response.data;
    },

    // Получить пользователя по ID
    async getUserById(id: number): Promise<UserDTO> {
        const response = await api.get<UserDTO>(`/user/${id}`);
        return response.data;
    },

    // Создать пользователя
    async createUser(user: Omit<UserDTO, 'id'>): Promise<void> {
        await api.post('/user', user);
    },

    // Обновить пользователя
    async updateUser(user: UserDTO): Promise<void> {
        await api.put('/user', user);
    },

    // Удалить пользователя
    async deleteUser(id: number): Promise<void> {
        await api.delete(`/user/${id}`);
    },

    // Создать несколько пользователей
    async createUsers(users: Omit<UserDTO, 'id'>[]): Promise<void> {
        await api.post('/user/all', users);
    },

    // Обновить несколько пользователей
    async updateUsers(users: UserDTO[]): Promise<void> {
        await api.put('/user/all', users);
    },

    // Удалить несколько пользователей
    async deleteUsers(ids: number[]): Promise<void> {
        await api.delete('/user/all', { data: ids });
    },
};
