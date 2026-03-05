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
import { useNavigation } from "@/hooks/useNavigation";

import RegisterForm from "@/components/login/RegisterForm";
import LoginForm from "@/components/login/LoginForm";
import AuthTabs from "@/components/login/AuthTabs";
import Header from "@/components/login/Header";
import LanguageDropdown from "@/components/login/LanguageDropdown";
import { useLogin } from "@/hooks/useLogin";
import { useAuth, UserSessionState } from "@/contexts/AuthContext";

export default function Auth() {
  const { t } = useTranslation();
  const router = useNavigation();
  const { sessionState } = useAuth();
  const {
    isLoading,
    isRegistering,
    loginForm,
    registerForm,
    setLoginForm,
    setRegisterForm,
    setIsRegistering,
    handleLogin,
    handleRegister,
    handleGuestLogin,
    setShowTermsRequired,
    goToResetPasswordRequest,
  } = useLogin();

  const shift = useRef(new Animated.Value(0)).current;

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={`flex-1 p-2 ${screenBg}`}>
        <TouchableOpacity
          onPress={() => router.toDashboard()}
          className="absolute top-12 left-4 z-10 bg-card dark:bg-gray-800 ocean:bg-ocean-card p-2 rounded-full shadow-md"
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>

        {/*<LanguageDropdown />*/}

        <View className="flex-1 justify-center">
          <Header />

          <Animated.View
            style={{ transform: [{ translateY: shift }] }}
            className={`rounded-2xl shadow-xl p-4 mt-8 mx-4 ${cardBg}`}
          >
            <View className="p-2">
              <Text
                className={`text-2xl font-bold tracking-tight text-center font-sans ${textFg}`}
              >
                {t("welcome.animatedView.title")}
              </Text>
              <Text
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

            {/* Кнопка гостевого входа - скрываем, если уже гость */}
            {sessionState !== UserSessionState.GUEST && (
              <TouchableOpacity
                onPress={handleGuestLogin}
                disabled={isLoading}
                className="mt-4 p-3 rounded-lg border border-gray-300 dark:border-gray-600"
              >
                <Text className={`text-center font-medium ${textFg}`}>
                  Continue as Guest
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
