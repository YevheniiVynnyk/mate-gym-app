import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import CustomInput from './CustomInput';

type Props = {
    form: { login: string; password: string };
    setForm: (v: any) => void;
    onSubmit: () => void;
    isLoading: boolean;
};

const LoginForm: React.FC<Props> = ({ form, setForm, onSubmit, isLoading }) => (
    <View className="m-2">
        <Text className="text-sm font-medium leading-none p-2">Логин</Text>
        <CustomInput
            placeholder="Логин"
            value={form.login}
            onChangeText={(text: string) => setForm({ ...form, login: text })}
        />
        <Text className="text-sm font-medium leading-none p-2 mt-2">Пароль</Text>
        <CustomInput
            placeholder="Пароль"
            secureTextEntry
            value={form.password}
            onChangeText={(text: string) => setForm({ ...form, password: text })}
        />
        <TouchableOpacity
            className="bg-secondary rounded-lg p-3 mt-4"
            onPress={onSubmit}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text className="text-center text-white font-semibold">Войти</Text>
            )}
        </TouchableOpacity>
    </View>
);

export default LoginForm;
