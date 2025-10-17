import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const DurationModal = ({
    visible,
    value,
    onChange,
    onCancel,
    onSubmit,
}: {
    visible: boolean;
    value: string;
    onChange: (v: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}) => (
    <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center p-6 bg-white">
            <Text className="text-center text-lg mb-2">
                Сколько времени заняла тренировка? (мин)
            </Text>

            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-4 text-center"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
            />

            <View className="flex-row justify-around">
                <TouchableOpacity onPress={onCancel} className="px-6 py-3 bg-gray-200 rounded-lg">
                    <Text className="text-gray-700 font-semibold">Отмена</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSubmit} className="px-6 py-3 bg-blue-500 rounded-lg">
                    <Text className="text-white font-semibold">Сохранить</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);
