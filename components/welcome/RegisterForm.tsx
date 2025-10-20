import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "./CustomInput";

type Props = {
  form: {
    login: string;
    email: string;
    password: string;
    role: string;
  };
  setForm: (v: any) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const RegisterForm: React.FC<Props> = ({
  form,
  setForm,
  onSubmit,
  isLoading,
}) => (
  <View className="space-y-4">
    <Text className="text-sm font-medium leading-none p-2 m-2">Логин</Text>
    <CustomInput
      placeholder="Логин"
      value={form.login}
      onChangeText={(text: string) => setForm({ ...form, login: text })}
    />
    <Text className="text-sm font-medium leading-none p-2 m-2">Почта</Text>
    <CustomInput
      placeholder="Email"
      value={form.email}
      onChangeText={(text: string) => setForm({ ...form, email: text })}
    />
    <Text className="text-sm font-medium leading-none p-2 m-2">Пароль</Text>
    <CustomInput
      placeholder="Пароль"
      secureTextEntry
      value={form.password}
      onChangeText={(text: string) => setForm({ ...form, password: text })}
    />
    <TouchableOpacity
      className="bg-secondary rounded-lg p-3 m-2"
      onPress={onSubmit}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-center text-white font-semibold">
          Создать аккаунт
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

export default RegisterForm;
