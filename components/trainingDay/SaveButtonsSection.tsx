import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
    isLoading: boolean;
    onSave: () => void;
    onExecute: () => void;
}

export const SaveButtonsSection = ({ isLoading, onSave, onExecute }: Props) => (
    <View className="flex-row justify-between my-2">
        <TouchableOpacity
            className="flex-1 bg-green-500 py-3 rounded-lg items-center mr-2"
            onPress={onSave}
            disabled={isLoading}
        >
            <Text className="text-white font-bold">
                {isLoading ? 'Сохранение...' : 'Сохранить'}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            className="flex-1 bg-green-600 py-3 rounded-lg items-center ml-2"
            onPress={onExecute}
            disabled={isLoading}
        >
            <Text className="text-white font-bold">Выполнить</Text>
        </TouchableOpacity>
    </View>
);
