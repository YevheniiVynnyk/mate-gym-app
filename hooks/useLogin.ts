import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export const useLogin = () => {
  const router = useRouter();
  const { login, register, loginAsGuest } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showTermsRequired, setShowTermsRequired] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    login: "",
    role: "CLIENT",
  });

  // --- Логика авторизации ---
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(loginForm.login, loginForm.password);
      router.push("/dashboard");
    } catch (e) {
      console.error("Ошибка входа:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await register(
        registerForm.email,
        registerForm.password,
        registerForm.login,
        registerForm.role,
      );
      router.push("/dashboard");
    } catch (e) {
      console.error("Ошибка регистрации:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      await loginAsGuest();
      router.push("/dashboard");
    } catch (e) {
      console.error("Ошибка гостевого входа:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Роутинг для сброса пароля ---
  const goToResetPasswordRequest = () => {
    router.push("/reset-password-request");
  };

  const goToResetPassword = (token: string) => {
    router.push(`/reset-password/${token}`);
  };

  return {
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
    handleGuestLogin, // Экспортируем новую функцию
    setShowTermsRequired,
    goToResetPasswordRequest,
    goToResetPassword,
  };
};
