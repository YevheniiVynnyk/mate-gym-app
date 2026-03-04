import { UserDTO } from "@/services/userService";
import { User } from "@/types/user";

/**
 * Преобразует UserDTO (сервер) в локальную модель User
 */
export const fromUserDTO = (dto: UserDTO): User => {
  // Определяем роль. Если пришло что-то неизвестное, считаем GUEST
  let role: User["role"] = "GUEST";
  if (dto.role === "CLIENT") role = "CLIENT";
  if (dto.role === "TRAINER") role = "TRAINER";

  return {
    id: dto.id,
    login: dto.login,
    password: dto.password || "",
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    age: dto.age || 0,
    phoneNumber: dto.phoneNumber || "",
    birthday: dto.birthday || "",
    role: role,
    subscription: role === "TRAINER" ? "pro_trainer" : "free",
    createdAt: dto.birthday ? new Date(dto.birthday) : new Date(),
    trainerCode: undefined,
    imageId: dto.imageId ? dto.imageId : 0,
    isGuest: role === "GUEST", // Вычисляем на основе роли
  };
};

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
  role: user.role, // Передаем роль как есть
  phoneNumber: user.phoneNumber,
  imageId: user.imageId,
  birthday: user.birthday,
  settings: undefined,
});
