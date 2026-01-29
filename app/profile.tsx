import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useNavigation } from "@/hooks/useNavigation";
import AvatarSection from "@/components/profile/AvatarSection";
import UserInfoSection from "@/components/profile/UserInfoSection";
import SettingsSection from "@/components/profile/SettingsSection";
import PrivacyDialog from "@/components/profile/PrivacyDialog";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "react-i18next";
// Используем функцию cn, как это было сделано в других компонентах.
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};
export default function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const router = useNavigation();
  const {
    loading,
    pickAvatar,
    isEditing,
    setIsEditing,
    setFormDataUserWithAge,
    formDataUser,
    setFormDataUser,
    handleSaveUser,
    handleLogout,
    isPrivacyDialogOpen,
    setIsPrivacyDialogOpen,
  } = useProfile();
  // ✅ ИСПОЛЬЗУЕМ CN для применения адаптивных классов фона к ScrollView
  const scrollContainerClasses = cn(
    "flex-1 p-4",
    "bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background",
  );

  // Если пользователь не авторизован, показываем кнопку входа
  if (!user) {
    return (
      <ScrollView className={scrollContainerClasses}>
        <View className="flex-1 justify-center items-center mt-20">
          <Card className="p-6 w-full items-center">
            <Text className="text-xl font-bold mb-4 text-center text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
              {t("Profile.notAuthorized") || "Вы не авторизованы"}
            </Text>
            <Text className="text-base mb-6 text-center text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70">
              {t("Profile.loginPrompt") ||
                "Войдите в аккаунт, чтобы получить доступ к профилю и настройкам"}
            </Text>
            <TouchableOpacity
              className="bg-primary dark:bg-primary-600 ocean:bg-ocean-primary px-6 py-3 m-2 rounded-lg"
              onPress={() => router.toAuth()}
            >
              <Text className="text-white font-bold text-center">
                {t("Profile.loginButton") || "Войти"}
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className={scrollContainerClasses} // Применяем объединенные классы
    >
      <AvatarSection user={user} pickAvatar={pickAvatar} loading={loading} />
      <UserInfoSection
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        formDataUser={formDataUser}
        setFormDataUser={setFormDataUser}
        handleSaveUser={handleSaveUser}
        setFormDataUserWithAge={setFormDataUserWithAge}
      />
      <SettingsSection handleLogout={handleLogout} />
      <PrivacyDialog
        open={isPrivacyDialogOpen}
        onClose={() => setIsPrivacyDialogOpen(false)}
      />
    </ScrollView>
  );
}
