import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export const useWelcome = () => {
  const router = useRouter();
  const { user, login, register, acceptTerms, logout } = useAuth();

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
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    logout,
    setShowTermsRequired,
  };
};
