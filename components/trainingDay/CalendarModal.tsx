import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

export const CalendarModal = ({ visible, onClose, onSelect, selectedDate }: any) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tempDate, setTempDate] = useState(selectedDate || new Date());

    const handleDayPress = (day: any) => {
        const date = new Date(day.dateString);
        setTempDate(date);
        setShowTimePicker(true);
    };

    const handleTimeChange = (event: any, time?: Date) => {
        if (time) {
            const newDate = new Date(tempDate);
            newDate.setHours(time.getHours(), time.getMinutes());
            onSelect(newDate);
            setShowTimePicker(false);
            onClose();
        } else {
            setShowTimePicker(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white w-11/12 rounded-xl p-4">
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            [tempDate.toISOString().split('T')[0]]: { selected: true },
                        }}
                    />
                    {showTimePicker && (
                        <DateTimePicker
                            value={tempDate}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                        />
                    )}
                    <TouchableOpacity onPress={onClose} className="mt-4 p-3 bg-gray-100 rounded-lg">
                        <Text className="text-center text-red-500 font-semibold">Закрыть</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
