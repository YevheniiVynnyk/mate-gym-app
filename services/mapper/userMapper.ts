import {UserDTO} from "@/services/userService";
import {User} from "@/types/user";

/**
 * Преобразует UserDTO (сервер) в локальную модель User
 */
export const fromUserDTO = (dto: UserDTO): User => ({
	id: dto.id,
	login: dto.login,
	password: dto.password || '',
	email: dto.email,
	firstName: dto.firstName,
	lastName: dto.lastName,
	age: dto.age || 0,
	phoneNumber: dto.phoneNumber || '',
	// ✅ ИСПРАВЛЕНИЕ 1: birthday должно браться из dto.birthday и быть строкой
    birthday: dto.birthday || '',
	role: dto.role === 'CLIENT' ? 'CLIENT' : 'TRAINER',
	subscription: dto.role === 'TRAINER' ? 'pro_trainer' : 'free',
	createdAt: dto.birthday ? new Date(dto.birthday) : new Date(),
	trainerCode: undefined, // можно заполнять, если есть поле в DTO
	imageId: dto.imageId ? dto.imageId : 0,
});

/**
 * Преобразует локальную модель User в DTO для отправки на сервер
 */
export const toUserDTO = (user: User): UserDTO => ({
	id: user.id,
	login: user.login,
	password: user.password || undefined,
	email: user.email,
	firstName: user.firstName,
	lastName: user.lastName,
	age: user.age,
	role: user.role === 'TRAINER' ? 'TRAINER' : 'CLIENT',
	phoneNumber: user.phoneNumber,
	imageId: user.imageId, // если есть возможность, можно передавать ID изображения
	// Если user.birthday - это чистая строка "YYYY-MM-DD", передаем ее
    birthday: user.birthday,
	//birthday: user.createdAt.toISOString(),
	settings: undefined
});
