import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, cn } from "@/components/ui/Card";

interface Props {
  activeTab: "calendar" | "list";
  onChange: (tab: "calendar" | "list") => void;
}

export function TrainingTabs({ activeTab, onChange }: Props) {
  return (
    <Card className="flex-row mb-4 p-0 rounded-xl">
      {["calendar", "list"].map((tab) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            className={cn(
              "flex-1 p-3 items-center rounded-xl",
              isActive &&
                "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary",
              !isActive && "bg-card dark:bg-gray-800 ocean:bg-ocean-card",
            )}
            onPress={() => onChange(tab as "calendar" | "list")}
          >
            <Text
              className={cn(
                "font-semibold",
                isActive &&
                  "text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground",
                !isActive &&
                  "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70",
              )}
            >
              {tab === "calendar" ? "Календарь" : "Список"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Card>
  );
}
