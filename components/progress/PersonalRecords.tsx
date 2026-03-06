import React from "react";
import { Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { PersonalRecordDTO } from "@/types/progress";
import { Trophy } from "lucide-react-native";

interface Props {
  records: PersonalRecordDTO[];
}

export const PersonalRecords: React.FC<Props> = ({ records }) => {
  return (
    <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Trophy size={20} className="text-yellow-500 mr-2" />
        <Text className="text-lg font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          Personal Records
        </Text>
      </View>
      
      {records.map((record) => (
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
      ))}
    </Card>
  );
};
