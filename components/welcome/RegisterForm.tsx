import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "./CustomInput";
import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation();
  return (
    <View className="space-y-4">
      <Text className="text-sm font-medium leading-none p-2 m-2">
        {t("LoginForm.loginText")}
      </Text>
      <CustomInput
        placeholder={t("LoginForm.loginText")}
        value={form.login}
        onChangeText={(text: string) => setForm({ ...form, login: text })}
        autoCapitalize="none"
      />
      <Text className="text-sm font-medium leading-none p-2 m-2">
        {t("LoginForm.emailText")}
      </Text>
      <CustomInput
        placeholder={t("LoginForm.emailText")}
        value={form.email}
        onChangeText={(text: string) => setForm({ ...form, email: text })}
        autoCapitalize="none"
      />
      <Text className="text-sm font-medium leading-none p-2 m-2">
        {t("LoginForm.passwordText")}
      </Text>
      <CustomInput
        placeholder={t("LoginForm.passwordText")}
        secureTextEntry
        value={form.password}
        onChangeText={(text: string) => setForm({ ...form, password: text })}
        autoCapitalize="none"
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
            {t("LoginForm.registerButtonText")}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
