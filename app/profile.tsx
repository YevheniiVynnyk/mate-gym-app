import React from "react";
import { ScrollView, View } from "react-native";
import { useAuth, UserSessionState } from "@/contexts/AuthContext";
import SettingsSection from "@/components/profile/SettingsSection";
import AvatarSection from "@/components/profile/AvatarSection";
import UserInfoSection from "@/components/profile/UserInfoSection";
import PrivacyDialog from "@/components/profile/PrivacyDialog";
import GuestProfile from "@/components/profile/GuestProfile";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/components/ui/Card";

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
    "flex-1 bg-background dark:bg-gray-900 ocean:bg-ocean-background",
  );

  if (sessionState === UserSessionState.GUEST || user?.role === "GUEST") {
    return (
      <ScrollView
        className={scrollContainerClasses}
        contentContainerStyle={{ padding: 16 }}
      >
        <GuestProfile />
        <SettingsSection handleLogout={() => {}} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className={scrollContainerClasses}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View className="p-4">
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
      </View>
    </ScrollView>
  );
}
