import React from "react";
import { View } from "react-native";
import Feature from "./Feature";
import { Clock, TrendingUp, Users } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function FeaturesList() {
  const { t } = useTranslation();
  return (
    <View className="flex-row justify-between mt-2 mx-2 space-x-4">
      <Feature
        icon={<TrendingUp color="#4ADE80" size={22} />}
        title={t("welcome.FeaturesListBlock.FeatureTitle1")}
        text={t("welcome.FeaturesListBlock.FeatureText1")}
      />
      <Feature
        icon={<Users color="#34C759" size={22} />}
        title={t("welcome.FeaturesListBlock.FeatureTitle2")}
        text={t("welcome.FeaturesListBlock.FeatureText2")}
      />
      <Feature
        icon={<Clock color="#3B82F6" size={22} />}
        title={t("welcome.FeaturesListBlock.FeatureTitle3")}
        text={t("welcome.FeaturesListBlock.FeatureText3")}
      />
    </View>
  );
}
