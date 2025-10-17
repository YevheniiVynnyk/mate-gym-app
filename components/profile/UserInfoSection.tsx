import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Edit3, Save, Calendar as CalendarIcon } from 'lucide-react-native';
import { useState } from 'react';
// Імпортуємо DatePicker

import DateTimePicker from '@react-native-community/datetimepicker';

export default function UserInfoSection({
    isEditing,
    setIsEditing,
    formDataUser,
    setFormDataUser,
    handleSaveUser,
}: any) {
    // Функція, що повертає динамічні класи для стилю TextInput
    const getInputStyle = () => {
        // Базові класи
        let baseClass = 'border rounded-md p-2 mb-2 ';

        if (isEditing) {
            // Класи, коли поле АКТИВНЕ: синя рамка, світло-сірий фон
            return baseClass + 'border-blue-50 bg-blue-50';
        } else {
            // Класи, коли поле НЕАКТИВНЕ: сіра рамка, білий фон
            return baseClass + 'border-gray-300 bg-white';
        }
    };

    // ✅ НОВИЙ СТАН: Для управління видимістю календаря
    const [showDatePicker, setShowDatePicker] = useState(false);

    // ✅ НОВА ФУНКЦІЯ: Обробка вибору дати
    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        // Приховуємо календар після вибору (крім Android, де він закривається автоматично)
        setShowDatePicker(Platform.OS === 'ios');

        if (selectedDate) {
            // Перетворення об'єкта Date у рядок YYYY-MM-DD
            const formattedDate = selectedDate.toISOString().split('T')[0];

            setFormDataUser((prev: any) => ({
                ...prev,
                birthday: formattedDate,
            }));
        }
    };
    const currentBirthday = formDataUser.birthday
        ? // ✅ Якщо дата є (і це рядок), створюємо об'єкт Date
          new Date(formDataUser.birthday)
        : // ✅ Якщо дати немає або це порожній рядок, встановлюємо сьогоднішню дату
          new Date();
    console.log(currentBirthday);
    return (
        <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xl">Личная информация</Text>
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => (isEditing ? handleSaveUser() : setIsEditing(true))}
                >
                    {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
                    <Text className="ml-1 text-blue-500">
                        {isEditing ? 'Сохранить' : 'Редактировать'}
                    </Text>
                </TouchableOpacity>
            </View>

            {[
                { placeholder: 'Имя', key: 'firstName' },
                { placeholder: 'Фамилия', key: 'lastName' },
                { placeholder: 'Email', key: 'email', keyboardType: 'email-address' },
                { placeholder: 'Логин', key: 'login' },
                { placeholder: 'Телефон', key: 'phoneNumber', keyboardType: 'phone-pad' },
                { placeholder: 'Возраст', key: 'age', keyboardType: 'numeric' },
            ].map((item) => (
                <TextInput
                    key={item.key}
                    //className="border border-gray-300 rounded-md p-2 mb-2"
                    className={getInputStyle()}
                    placeholder={item.placeholder}
                    value={String((formDataUser as any)[item.key] ?? '')}
                    editable={isEditing}
                    keyboardType={item.keyboardType as any}
                    onChangeText={(text) =>
                        setFormDataUser((prev: any) => {
                            // Спрощуємо логіку: тепер завжди зберігаємо 'text' (рядок)
                            // незалежно від того, чи це 'age', 'firstName', чи інше поле.
                            // Це вирішує конфлікт типів.
                            return {
                                ...prev,
                                [item.key]: text,
                            };
                        })
                    }
                />
            ))}
            {/* ========================================================= */}
            {/* ✅ НОВИЙ КОМПОНЕНТ ДЛЯ ДАТИ НАРОДЖЕННЯ */}
            <TouchableOpacity
                className={getInputStyle() + ' flex-row justify-between items-center'}
                onPress={() => isEditing && setShowDatePicker(true)}
                disabled={!isEditing}
            >
                <Text className={formDataUser.birthday ? 'text-gray-700' : 'text-gray-400'}>
                    {formDataUser.birthday || 'Дата рождения (ГГГГ-ММ-ДД)'}
                </Text>
                {isEditing && <CalendarIcon size={20} color="#3b82f6" />}
            </TouchableOpacity>

            {/* Відображення DatePicker */}
            {showDatePicker && (
                <DateTimePicker
                    value={currentBirthday}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    // Обмеження, якщо потрібно, наприклад, максимальна дата - сьогодні
                    maximumDate={new Date()}
                />
            )}

            {/* ========================================================= */}
            {formDataUser.role === 'CLIENT' && (
                <TextInput
                    //className="border border-gray-300 rounded-md p-2 mb-2"
                    className={getInputStyle()}
                    placeholder="Цели"
                    value={formDataUser.goals}
                    editable={isEditing}
                    onChangeText={(text) => setFormDataUser({ ...formDataUser, goals: text })}
                />
            )}
        </View>
    );
}
