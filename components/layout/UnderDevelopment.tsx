import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

const UnderDevelopment: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-xl font-semibold mb-2 text-center">
        {t("underDevelopment.title")}
      </Text>
      <Text className="text-sm text-gray-500 text-center">
        {t("underDevelopment.description")}
      </Text>
    </View>
  );
};

export default UnderDevelopment;
