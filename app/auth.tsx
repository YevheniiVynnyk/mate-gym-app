import React, { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import TermsDialog from "@/components/welcome/TermsDialog";
import Header from "@/components/welcome/Header";
import FeaturesList from "@/components/welcome/FeaturesList";
import AuthTabs from "@/components/welcome/AuthTabs";
import LoginForm from "@/components/welcome/LoginForm";
import RegisterForm from "@/components/welcome/RegisterForm";
import LanguageDropdown from "@/components/welcome/LanguageDropdown";
import { useNavigation } from "@/hooks/useNavigation";
import { useTheme } from "@/contexts/ThemeContext";

import { useWelcome } from "@/hooks/useWelcome";

export default function Auth() {
  const { t } = useTranslation();
  const router = useNavigation();
  const { theme } = useTheme();
  const {
    user,
    isLoading,
    isRegistering,
    loginForm,
    registerForm,
    setLoginForm,
    setRegisterForm,
    setIsRegistering,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    acceptTerms,
    setShowTermsRequired,
    goToResetPasswordRequest,
  } = useWelcome();

  const shift = useRef(new Animated.Value(0)).current;

  // --- Адаптивные классы Card UI ---
  const screenBg = "bg-background dark:bg-gray-900 ocean:bg-ocean-background";
  const cardBg = "bg-card dark:bg-gray-800 ocean:bg-ocean-card-DEFAULT";
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const textMutedFg =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70";

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onKeyboardShow = (e: KeyboardEvent) => {
      const height = e.endCoordinates.height;
      // Используем Platform.OS для учета разницы в поведении клавиатуры (iOS требует немного больше отступа)
      const offset = Platform.OS === "ios" ? 80 : 20;
      Animated.timing(shift, {
        toValue: -height + offset,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };

    const onKeyboardHide = () => {
      Animated.timing(shift, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };

    const showSub = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideSub = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [shift]);

  if (user && !user.hasAcceptedTerms) {
    return (
      <TermsDialog
        open={true}
        onAccept={async () => await acceptTerms()}
        onDecline={() => setShowTermsRequired(true)}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        // ✅ АДАПТАЦИЯ: Фон экрана
        className={`flex-1 p-4 ${screenBg}`}
      >
        {/* Кнопка "Назад" в верхнем левом углу */}
        <TouchableOpacity
          onPress={() => router.toDashboard()}
          className="absolute top-12 left-4 z-10 bg-card dark:bg-gray-800 ocean:bg-ocean-card p-2 rounded-full shadow-md"
        >
          <ArrowLeft
            size={24}
            color={
              theme === "ocean"
                ? "#b3e5fc"
                : theme === "dark"
                  ? "#f3f4f6"
                  : "#111827"
            }
          />
        </TouchableOpacity>

        <LanguageDropdown />

        <View className="flex-1 justify-center">
          <Header />
          <FeaturesList />

          <Animated.View
            style={{ transform: [{ translateY: shift }] }}
            // ✅ АДАПТАЦИЯ: Фон карточки формы
            className={`rounded-2xl shadow-xl p-4 mt-8 mx-4 ${cardBg}`}
          >
            <View className="p-2">
              <Text
                // ✅ АДАПТАЦИЯ: Заголовок (foreground)
                className={`text-2xl font-bold tracking-tight text-center font-sans ${textFg}`}
              >
                {t("welcome.animatedView.title")}
              </Text>
              <Text
                // ✅ АДАПТАЦИЯ: Описание (muted-foreground)
                className={`text-sm text-center font-sans ${textMutedFg}`}
              >
                {t("welcome.animatedView.text")}
              </Text>
            </View>

            <AuthTabs
              isRegistering={isRegistering}
              setIsRegistering={setIsRegistering}
            />

            {!isRegistering ? (
              <LoginForm
                form={loginForm}
                setForm={setLoginForm}
                onSubmit={handleLogin}
                onGoogleLogin={handleGoogleLogin}
                isLoading={isLoading}
                onForgotPassword={goToResetPasswordRequest}
              />
            ) : (
              <RegisterForm
                form={registerForm}
                setForm={setRegisterForm}
                onSubmit={handleRegister}
                isLoading={isLoading}
              />
            )}
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
