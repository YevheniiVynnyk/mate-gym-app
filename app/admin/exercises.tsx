// app/admin/index.tsx
import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMuscleGroup } from "@/hooks/admin/useMuscleGroup";

export default function Exercises() {
  const { t } = useTranslation();
  const router = useNavigation();
  const [activeTab, setActiveTab] = useState<"groups" | "exercises">("groups");
  const { user } = useAuth();
  const { muscleGroups } = useMuscleGroup();

  const MuscleGroupsList = ({ muscleGroups }) => {
    if (!muscleGroups || muscleGroups.length === 0) {
      return (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Нет доступных групп мышц.
        </p>
      );
    }

    return (
      <div className="space-y-3 mt-4">
        <Button
          title="➕ Добавить новую группу мышц"
          onPress={() => Alert("Add New Muscle Group")}
          className="bg-green-500 hover:bg-green-600"
        />
        {muscleGroups.map((group) => (
          <Card
            key={group.id}
            className="p-3 cursor-pointer"
            onClick={() => alert(`Edit Group: ${group.name}`)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">{group.name}</p>
              <span className="text-blue-500 font-bold">Ред. &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <View className="flex-1 p-4 bg-background dark:bg-gray-900 ocean:bg-ocean-background">
        {/* Приветствие */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {t("Dashboard.welcomeText")}
              {user?.firstName || "Пользователь"}!
            </CardTitle>
            <CardDescription className="mt-1">
              {t(
                "Dashboard.welcomeMessageУправление пользователями, контентом и настройками приложения.",
              )}
            </CardDescription>
          </CardHeader>
        </Card>

        <Button title="Статистика" onPress={() => router.toStatsPage()} />
        <Button title="Пользователи" onPress={() => router.toUsersPage()} />
        <Button title="Упражнения" onPress={() => router.toExercisesPage()} />
        <Button title="Платежи" onPress={() => router.toPaymentsPage()} />

        <Card className="flex-row mb-4 p-0 rounded-xl">
          {["groups", "exercises"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                className={cn(
                  "flex-1 p-3 items-center rounded-xl",
                  // Активная вкладка
                  isActive &&
                    "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary",
                  // Неактивная вкладка
                  !isActive && "bg-card dark:bg-gray-800 ocean:bg-ocean-card",
                )}
                onPress={() => setActiveTab(tab as "groups" | "exercises")}
              >
                <Text
                  className={cn(
                    "font-semibold rounded-xl",
                    // Текст активной вкладки
                    isActive &&
                      "text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground",
                    // Текст неактивной вкладки
                    !isActive &&
                      "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70",
                  )}
                >
                  {tab === "groups" ? "Группы мышц" : "Упражнения"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Card>
        {activeTab === "groups" ? (
          <MuscleGroupsList muscleGroups={muscleGroups} />
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
}
