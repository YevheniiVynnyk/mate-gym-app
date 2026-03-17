import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/Card";
import { GoalDTO } from "@/types/progress";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Props {
  goals: GoalDTO[];
}

export const GoalsProgress: React.FC<Props> = ({ goals }) => {
  const router = useRouter();

  return (
    <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm">
      <Text className="text-lg font-bold mb-4 text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
        Goals
      </Text>
      
      {(!goals || goals.length === 0) ? (
        <View className="items-center justify-center py-8">
          <Text className="text-muted-foreground dark:text-gray-400 mb-4 text-center">
            You haven't set any goals yet.
          </Text>
          <TouchableOpacity 
            onPress={() => { /* TODO: Navigate to goal setting screen */ }}
            className="bg-primary/10 dark:bg-primary-900/30 py-2 px-4 rounded-lg flex-row items-center"
          >
            <Text className="text-primary dark:text-primary-400 font-bold">
              Set a Goal
            </Text>
            <ChevronRight size={16} className="text-primary dark:text-primary-400 ml-1" />
          </TouchableOpacity>
        </View>
      ) : (
        goals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <View key={goal.id} className="mb-4 last:mb-0">
              <View className="flex-row justify-between mb-1">
                <Text className="text-sm font-medium text-foreground dark:text-gray-200 ocean:text-ocean-foreground">
                  {goal.title}
                </Text>
                <Text className="text-sm text-muted-foreground dark:text-gray-400">
                  {goal.current} / {goal.target} {goal.unit}
                </Text>
              </View>
              <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
              </View>
            </View>
          );
        })
      )}
    </Card>
  );
};
