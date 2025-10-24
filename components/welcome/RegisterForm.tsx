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
  // Определяем адаптивные классы для текста меток
  const labelTextClass =
    "text-sm font-medium leading-none p-2 text-black dark:text-gray-100 ocean:text-ocean-foreground";

  // Определяем адаптивные классы для кнопки (secondary)
  const buttonBgClass = "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";
  const { t } = useTranslation();
  return (
    <View className="space-y-4">
      <Text className={labelTextClass}>{t("LoginForm.loginText")}</Text>
      <CustomInput
        placeholder={t("LoginForm.loginText")}
        value={form.login}
        onChangeText={(text: string) => setForm({ ...form, login: text })}
        autoCapitalize="none"
      />
      <Text className={labelTextClass}>{t("LoginForm.emailText")}</Text>
      <CustomInput
        placeholder={t("LoginForm.emailText")}
        value={form.email}
        onChangeText={(text: string) => setForm({ ...form, email: text })}
        autoCapitalize="none"
      />
      <Text className={labelTextClass}>{t("LoginForm.passwordText")}</Text>
      <CustomInput
        placeholder={t("LoginForm.passwordText")}
        secureTextEntry
        value={form.password}
        onChangeText={(text: string) => setForm({ ...form, password: text })}
        autoCapitalize="none"
      />
      <TouchableOpacity
        className={`rounded-lg p-3 mt-4 ${buttonBgClass}`}
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
