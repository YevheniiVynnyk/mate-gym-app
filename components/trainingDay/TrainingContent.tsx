import React from "react";
import { TrainingCalendar } from "@/components/trainingDay/TrainingCalendar";
import { TrainingList } from "@/components/trainingDay/TrainingList";

interface Props {
  activeTab: "calendar" | "list";
  selectedDate?: string;
  setSelectedDate: (date?: string) => void;
  trainingDays: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredDays: any[];
}

export function TrainingContent({
  activeTab,
  selectedDate,
  setSelectedDate,
  trainingDays,
  searchTerm,
  setSearchTerm,
  filteredDays,
}: Props) {
  if (activeTab === "calendar") {
    return (
      <TrainingCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        trainingDays={trainingDays}
      />
    );
  }

  return (
    <TrainingList
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredDays={filteredDays}
    />
  );
}
