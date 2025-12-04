// app/admin/index.tsx
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Stack } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";

export default function Users() {
  const { t } = useTranslation();
  const router = useNavigation();
  const { user } = useAuth();
  return (
    <ScrollView
      className="flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        <Stack.Screen options={{ title: "Панель Администратора" }} />
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  section: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
});
