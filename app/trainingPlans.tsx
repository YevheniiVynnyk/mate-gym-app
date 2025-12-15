import React from "react";
import { ScrollView } from "react-native";
import UnderDevelopment from "@/components/layout/UnderDevelopment"; // путь к компоненту

const TrainingPlansPage = () => {
  // ✅ Иначе обычный рендер страницы с планами тренировок
  return (
    <ScrollView className="flex-1">
      <UnderDevelopment />
    </ScrollView>
  );
};

export default TrainingPlansPage;
