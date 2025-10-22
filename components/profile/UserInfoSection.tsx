import { useMemo, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, Edit3, Save } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

export default function UserInfoSection({
  isEditing,
  setIsEditing,
  formDataUser,
  setFormDataUser,
  handleSaveUser,
  setFormDataUserWithAge,
}: any) {
  // 💡 Вызываем хук useTranslation для получения функции t
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Функция для форматирования даты в "ГГГГ-ММ-ДД"
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // Если строка уже в нужном формате, используем ее.
    // В противном случае, создаем объект Date для форматирования
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Вернуть, если неверная дата
      return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    } catch (e) {
      return dateString + e;
    }
  };
  // ✅ ИЗМЕНЕННЫЙ Обработчик выбора даты
  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    // ... (логика скрытия пикера на Android и iOS)
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "set") {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

      // 🎯 ИСПОЛЬЗУЕМ НОВУЮ ФУНКЦИЮ, КОТОРАЯ ОБНОВИТ И birthday, И age
      setFormDataUserWithAge(formattedDate);
    } else if (event.type === "dismissed" && Platform.OS === "ios") {
      setShowDatePicker(false);
    }
  };
  // Список полей, теперь без 'birthday' в цикле
  const textFields = [
    { placeholder: t("userInfo.placeholder.firstName"), key: "firstName" },
    { placeholder: t("userInfo.placeholder.lastName"), key: "lastName" },
    {
      placeholder: t("userInfo.placeholder.email"),
      key: "email",
      keyboardType: "email-address",
    },
    { placeholder: t("userInfo.placeholder.login"), key: "login" },
    {
      placeholder: t("userInfo.placeholder.phone"),
      key: "phoneNumber",
      keyboardType: "phone-pad",
    },
    {
      placeholder: t("userInfo.placeholder.age"),
      key: "age",
      keyboardType: "numeric",
    },
  ];
  // ✅ НОВОЕ РЕШЕНИЕ: Инициализация pickerDate через useMemo
  const pickerDate = useMemo(() => {
    if (formDataUser.birthday) {
      // Если дата есть, парсим ее без учета часового пояса (рекомендованный способ)
      try {
        const parts = formDataUser.birthday
          .split("-")
          .map((p: string) => parseInt(p, 10));
        // new Date(год, месяц-1, день)
        if (parts.length === 3 && !isNaN(parts[0])) {
          return new Date(parts[0], parts[1] - 1, parts[2]);
        }
      } catch (e) {
        console.error("Ошибка парсинга даты рождения:", e);
      }
    }
    // Если даты нет или парсинг не удался, возвращаем текущую дату,
    // но только для инициализации календаря, а не для сохранения!
    // Важно: эта дата не будет сохранена, пока пользователь не нажмет "Установить".
    return new Date();
  }, [formDataUser.birthday]);

  return (
    <View
      className="bg-white p-4 rounded-lg mb-4 shadow-sm 
    dark:bg-gray-800 
    ocean:bg-ocean-card-DEFAULT"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold mb-2 dark:text-gray-100 ocean:text-ocean-foreground">
          {t("userInfo.header")}
        </Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => (isEditing ? handleSaveUser() : setIsEditing(true))}
        >
          {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
          <Text className="ml-1 text-blue-500 mb-2 dark:text-gray-100 ocean:text-ocean-foreground">
            {isEditing ? t("userInfo.save") : t("userInfo.edit")}
          </Text>
        </TouchableOpacity>
      </View>

      {textFields.map((item) => (
        <TextInput
          key={item.key}
          className="border border-gray-300 rounded-md p-2 mb-2 
          text-gray-800 
          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
          ocean:bg-ocean-card-DEFAULT ocean:border-blue-800 ocean:text-ocean-foreground"
          placeholder={item.placeholder}
          value={String((formDataUser as any)[item.key] || "")}
          editable={isEditing}
          keyboardType={item.keyboardType as any}
          onChangeText={(text) =>
            setFormDataUser((prev: any) => ({
              ...prev,
              [item.key]: item.key === "age" ? Number(text) : text,
            }))
          }
        />
      ))}

      {/* ✅ Блок для даты рождения с DatePicker */}
      {/* ✅ Блок для даты рождения с DatePicker */}
      <TouchableOpacity
        className={`flex-row justify-between items-center border rounded-md p-2 mb-2 dark:text-gray-100 ocean:text-ocean-foreground  ${isEditing ? "border-blue-500" : "border-gray-300"}`}
        onPress={() => isEditing && setShowDatePicker(true)}
        disabled={!isEditing}
      >
        <Text
          className={
            formDataUser.birthday
              ? "text-gray-800 dark:text-gray-100 ocean:text-ocean-foreground"
              : "text-gray-400 dark:text-gray-100 ocean:text-ocean-foreground"
          }
        >
          {formDataUser.birthday
            ? `${t("userInfo.birthday")}: ${formatDate(formDataUser.birthday)}`
            : t("userInfo.birthday")}
        </Text>
        <Calendar size={18} color={isEditing ? "#3b82f6" : "#9ca3af"} />
      </TouchableOpacity>

      {/* ✅ Отображение пикера даты */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={pickerDate} // Используем корректно парсенное или дефолтное значение
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange} // В onDateChange мы правильно обновляем только при 'set'
          maximumDate={new Date()}
        />
      )}
      {formDataUser.role === "CLIENT" && (
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-2 dark:text-gray-100 ocean:text-ocean-foreground"
          placeholder={t("userInfo.goals")}
          value={formDataUser.goals}
          placeholderTextColor="#9ca3af"
          editable={isEditing}
          onChangeText={(text) =>
            setFormDataUser({ ...formDataUser, goals: text })
          }
        />
      )}
    </View>
  );
}
