import React, { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardEvent,
} from "react-native";
import TermsDialog from "@/components/welcome/TermsDialog";
import Header from "@/components/welcome/Header";
import FeaturesList from "@/components/welcome/FeaturesList";
import AuthTabs from "@/components/welcome/AuthTabs";
import LoginForm from "@/components/welcome/LoginForm";
import RegisterForm from "@/components/welcome/RegisterForm";
import { useWelcome } from "@/hooks/useWelcome";

export default function Welcome() {
  const {
    user,
    isLoading,
    isRegistering,
    showTermsRequired,
    loginForm,
    registerForm,
    setLoginForm,
    setRegisterForm,
    setIsRegistering,
    handleLogin,
    handleRegister,
    acceptTerms,
    setShowTermsRequired,
  } = useWelcome();

  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onKeyboardShow = (e: KeyboardEvent) => {
      const height = e.endCoordinates.height;
      Animated.timing(shift, {
        toValue: -height - 20, // поднимаем форму на высоту клавиатуры + запас 20
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
      <View className="flex-1 bg-background justify-center">
        <Header />
        <FeaturesList />

        <Animated.View
          style={{ transform: [{ translateY: shift }] }}
          className="bg-card rounded-2xl shadow-xl p-4 mt-8 mx-4"
        >
          <View className="p-2">
            <Text className="text-2xl font-bold tracking-tight text-center font-sans">
              Начните прямо сейчас!
            </Text>
            <Text className="text-muted-foreground text-sm text-center font-sans">
              Присоединяйтесь к тысячам довольных пользователей
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
    </TouchableWithoutFeedback>
  );
}
