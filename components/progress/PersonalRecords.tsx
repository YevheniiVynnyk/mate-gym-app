import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { PersonalRecordDTO } from "@/types/progress";
import { Trophy, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Props {
  records: PersonalRecordDTO[];
}

export const PersonalRecords: React.FC<Props> = ({ records }) => {
  const router = useRouter();

  return (
    <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Trophy size={20} className="text-yellow-500 mr-2" />
        <Text className="text-lg font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Personal Records
        </Text>
      </View>
      
      {(!records || records.length === 0) ? (
        <View className="items-center justify-center py-8">
          <Text className="text-muted-foreground dark:text-gray-400 mb-4 text-center">
            You don't have any personal records yet.
          </Text>
          <TouchableOpacity 
            onPress={() => router.push("/trainingDay/new")}
            className="bg-primary/10 dark:bg-primary-900/30 py-2 px-4 rounded-lg flex-row items-center"
          >
            <Text className="text-primary dark:text-primary-400 font-bold">
              Start a Workout
            </Text>
            <ChevronRight size={16} className="text-primary dark:text-primary-400 ml-1" />
          </TouchableOpacity>
        </View>
      ) : (
        records.map((record) => (
          <View key={record.exerciseId} className="flex-row justify-between items-center mb-3 last:mb-0 border-b border-border/30 pb-2 last:border-0">
            <View>
              <Text className="text-base font-medium text-foreground dark:text-gray-200 ocean:text-ocean-foreground">
                {record.exerciseName}
              </Text>
              <Text className="text-xs text-muted-foreground dark:text-gray-400">
                {record.date}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-primary dark:text-green-400 ocean:text-ocean-primary">
                {record.weight} kg
              </Text>
              {record.previousWeight && (
                <Text className="text-xs text-green-600 dark:text-green-400">
                  +{record.weight - record.previousWeight} kg
                </Text>
              )}
            </View>
          </View>
        ))
      )}
    </Card>
  );
};
