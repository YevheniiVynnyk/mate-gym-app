import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

type Props = {
  isRegistering: boolean;
  setIsRegistering: (value: boolean) => void;
};

const AuthTabs: React.FC<Props> = ({ isRegistering, setIsRegistering }) => {
  const { t } = useTranslation();
  const tabKeys = [
    "welcome.animatedView.authLoginText",
    "welcome.animatedView.authRegisterText",
  ];
  return (
    <View className="flex-row justify-center mx-4 my-2 bg-white dark:bg-gray-700 ocean:bg-ocean-card-DEFAULT rounded-lg">
      {tabKeys.map((key, index) => {
        const isActive =
          (!isRegistering && index === 0) || (isRegistering && index === 1);
        const label = t(key);
        // ✅ ИСПРАВЛЕНО: Теперь используется bg-primary (салатовый) для светлой темы
        const activeBgClass =
          "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";
        // ✅ ИСПРАВЛЕНО: Используем цвета muted для неактивного фона
        const inactiveBgClass =
          "bg-muted dark:bg-muted-DEFAULT ocean:bg-ocean-muted";

        const activeTextClass = "text-primary-foreground"; // Белый текст на primary
        // ✅ ИСПРАВЛЕНО: Используем цвета muted-foreground для неактивного текста
        const inactiveTextClass =
          "text-muted-foreground dark:text-gray-300 ocean:text-ocean-foreground";
        return (
          <TouchableOpacity
            key={key}
            // ✅ АДАПТАЦИЯ: Применяем классы фона
            className={`flex-1 p-3 m-1 rounded-lg ${
              isActive ? activeBgClass : inactiveBgClass
            }`}
            onPress={() => setIsRegistering(index === 1)}
          >
            <Text
              // ✅ АДАПТАЦИЯ: Применяем классы текста
              className={`text-center font-semibold ${
                isActive ? activeTextClass : inactiveTextClass
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AuthTabs;
