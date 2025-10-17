import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';

interface Props {
    trainingDayName: string;
    setTrainingDayName: (v: string) => void;
    trainingDayDate: Date;
    onOpenCalendar: () => void;
}

export const TrainingInfoSection = ({
    trainingDayName,
    setTrainingDayName,
    trainingDayDate,
    onOpenCalendar,
}: Props) => (
    <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-start space-x-3">
            <Text className="text-lg font-medium w-24">Название</Text>
            <TextInput
                className="flex-1 p-3 bg-gray-100 rounded-lg"
                placeholder="Введите название"
                value={trainingDayName}
                onChangeText={setTrainingDayName}
            />
        </View>

        <View className="flex-row items-center justify-start space-x-3">
            <Text className="text-lg font-medium w-24">Дата</Text>
            <TouchableOpacity
                className="flex-row items-center p-3 rounded-lg"
                onPress={onOpenCalendar}
            >
                <Calendar size={20} color="#555" className="mr-2" />
                <Text>
                    {trainingDayDate.toLocaleDateString()}{' '}
                    {trainingDayDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);
