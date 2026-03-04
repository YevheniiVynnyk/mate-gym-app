import React from "react";
import { ScrollView } from "react-native";
import { useAuth, UserSessionState } from "@/contexts/AuthContext";
import SettingsSection from "@/components/profile/SettingsSection";
import AvatarSection from "@/components/profile/AvatarSection";
import UserInfoSection from "@/components/profile/UserInfoSection";
import PrivacyDialog from "@/components/profile/PrivacyDialog";
import GuestProfile from "@/components/profile/GuestProfile";
import { useProfile } from "@/hooks/useProfile";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export default function Profile() {
  const { user, sessionState } = useAuth();
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

  const scrollContainerClasses = cn(
    "flex-1 p-4",
    "bg-gray-50 dark:bg-gray-900 ocean:bg-ocean-background",
  );

  // Проверка через UserSessionState или роль пользователя
  if (sessionState === UserSessionState.GUEST || user?.role === "GUEST") {
    return (
      <ScrollView className={scrollContainerClasses}>
        <GuestProfile />
      </ScrollView>
    );
  }

  return (
    <ScrollView className={scrollContainerClasses}>
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
