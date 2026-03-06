import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useTrainingDaysData } from "@/hooks/useTrainingDays";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { TrainingHeader } from "@/components/trainingDay/TrainingHeader";
import { TrainingTabs } from "@/components/trainingDay/TrainingTabs";
import { TrainingContent } from "@/components/trainingDay/TrainingContent";

export default function Index() {
  const { trainingDays, isLoading } = useTrainingDaysData();

  const [activeTab, setActiveTab] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDays = useMemo(() => {
    return trainingDays.filter((td) =>
      td.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [trainingDays, searchTerm]);

  if (isLoading) return <LoadingPage />;

  return (
    <View className="flex-1 p-4 bg-background dark:bg-gray-900 ocean:bg-ocean-background">
      <TrainingHeader />

      {/*<CreateTrainingButton onPress={router.toCreateTrainingDay} />*/}

      <TrainingTabs activeTab={activeTab} onChange={setActiveTab} />

      <TrainingContent
        activeTab={activeTab}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        trainingDays={trainingDays}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredDays={filteredDays}
      />
    </View>
  );
}
