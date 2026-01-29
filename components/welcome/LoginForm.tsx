import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "./CustomInput";
import GoogleSignInButton from "./GoogleSignInButton";
import { useTranslation } from "react-i18next";

type Props = {
  form: { login: string; password: string };
  setForm: (v: any) => void;
  onSubmit: () => void;
  onGoogleLogin?: () => void;
  isLoading: boolean;
  onForgotPassword?: () => void; // добавлено для обработки клика
};

const LoginForm: React.FC<Props> = ({
  form,
  setForm,
  onSubmit,
  onGoogleLogin,
  isLoading,
  onForgotPassword,
}) => {
  const { t } = useTranslation();
  const labelTextClass =
    "text-sm font-medium leading-none p-2 text-black dark:text-gray-100 ocean:text-ocean-foreground";

  const buttonBgClass = "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";

  return (
    <View className="m-2">
      <Text className={labelTextClass}>{t("LoginForm.loginText")}</Text>
      <CustomInput
        placeholder={t("LoginForm.loginText")}
        value={form.login}
        onChangeText={(text: string) => setForm({ ...form, login: text })}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
        textContentType="username"
        importantForAutofill="yes"
      />
      <Text className={labelTextClass}>{t("LoginForm.passwordText")}</Text>
      <CustomInput
        placeholder={t("LoginForm.passwordText")}
        secureTextEntry
        value={form.password}
        onChangeText={(text: string) => setForm({ ...form, password: text })}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        textContentType="password"
        importantForAutofill="yes"
      />

      {/* Ссылка "Забыл пароль?" */}
      {onForgotPassword && (
        <TouchableOpacity onPress={onForgotPassword} className="mt-2 mb-4">
          <Text className="text-sm text-blue-500 dark:text-blue-400 text-right">
            {t("LoginForm.forgotPassword")}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className={`rounded-lg p-3 ${buttonBgClass}`}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-white font-semibold">
            {t("LoginForm.authButtonText")}
          </Text>
        )}
      </TouchableOpacity>

      {/* Разделитель */}
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600 ocean:bg-blue-600" />
        <Text className="mx-3 text-sm text-gray-500 dark:text-gray-400 ocean:text-ocean-foreground/70">
          или
        </Text>
        <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600 ocean:bg-blue-600" />
      </View>

      {/* Кнопка Google Sign-In */}
      {onGoogleLogin && (
        <GoogleSignInButton onPress={onGoogleLogin} isLoading={isLoading} />
      )}
    </View>
  );
};

export default LoginForm;
