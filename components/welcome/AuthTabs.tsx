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
    <View className="flex-row justify-center mx-4 my-2 bg-background rounded-lg">
      {tabKeys.map((key, index) => {
        const isActive =
          (!isRegistering && index === 0) || (isRegistering && index === 1);
        const label = t(key);
        return (
          <TouchableOpacity
            key={key}
            className={`flex-1 p-3 m-1 ${
              isActive ? "bg-secondary rounded-lg" : "bg-muted rounded-lg"
            }`}
            onPress={() => setIsRegistering(index === 1)}
          >
            <Text
              className={`text-center font-semibold ${
                isActive ? "text-white" : "text-muted-foreground"
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
