import React from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface GoogleSignInButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  const { theme } = useTheme();

  const buttonClasses =
    "flex-row items-center justify-center rounded-lg p-3 border-2 " +
    "bg-white dark:bg-gray-800 ocean:bg-ocean-card " +
    "border-gray-300 dark:border-gray-600 ocean:border-blue-600 " +
    (disabled || isLoading ? "opacity-50" : "");

  const textClasses =
    "ml-2 font-semibold " +
    "text-gray-700 dark:text-gray-200 ocean:text-ocean-foreground";

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={theme === "dark" ? "#fff" : theme === "ocean" ? "#33c9ff" : "#4285F4"}
        />
      ) : (
        <>
          <Image
            source={{
              uri: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
            }}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text className={textClasses}>Войти через Google</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
