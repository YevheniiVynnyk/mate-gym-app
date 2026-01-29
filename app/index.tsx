import React, { useEffect, useState } from "react";
import Dashboard from "@/app/dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { BiometricPrompt } from "@/components/auth/BiometricPrompt";

export default function Index() {
  const { user, isLoading } = useAuth();
  const [showBiometric, setShowBiometric] = useState(false);

  useEffect(() => {
    const checkBiometric = async () => {
      if (!isLoading && !user) {
        const { biometricService } =
          await import("@/services/biometricService");
        try {
          const available = await biometricService.isAvailable();
          const enabled = await biometricService.isEnabled();
          const credentials = await biometricService.getCredentials();

          // Показываем биометрию только если она доступна, включена и есть сохраненные учетные данные
          if (available && enabled && credentials) {
            // Небольшая задержка для плавности
            setTimeout(() => {
              setShowBiometric(true);
            }, 500);
          }
        } catch (error) {
          console.error("Error checking biometric:", error);
        }
      }
    };

    checkBiometric();
  }, [isLoading, user]);

  const handleBiometricSuccess = () => {
    setShowBiometric(false);
  };

  const handleBiometricCancel = () => {
    setShowBiometric(false);
  };

  // Закрываем модальное окно биометрии, если пользователь авторизовался
  useEffect(() => {
    if (user) {
      setShowBiometric(false);
    }
  }, [user]);

  return (
    <>
      <Dashboard />
      <BiometricPrompt
        visible={showBiometric}
        onSuccess={handleBiometricSuccess}
        onCancel={handleBiometricCancel}
      />
    </>
  );
}
