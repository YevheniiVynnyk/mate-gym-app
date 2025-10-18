import React, { useState, useEffect } from "react";
import { Modal, View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { X } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { privacyService, PrivacyContent } from "@/services/privacyService";
import { useTranslation } from "react-i18next";

interface PrivacyDialogProps {
  open: boolean;
  onAccept: () => Promise<void>;
  onDecline: () => void;
}

const PrivacyDialog: React.FC<PrivacyDialogProps> = ({ open, onAccept, onDecline }) => {
  const { t } = useTranslation();
  const [isAccepting, setIsAccepting] = useState(false);
  const [privacyContent, setPrivacyContent] = useState<PrivacyContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) loadPrivacyContent();
  }, [open]);

  const loadPrivacyContent = async () => {
    setIsLoading(true);
    try {
      const content = await privacyService.getCurrent();
      setPrivacyContent(content);
    } catch (error) {
      console.error("Failed to load privacy content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await onAccept();
    } catch (error) {
      console.error("Failed to accept privacy policy:", error);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
      <Modal animationType="fade" transparent visible={open} onRequestClose={onDecline}>
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-white rounded-lg max-w-lg w-full max-h-[80%] p-6">
            {/* Header */}
            <View className="mb-4">
              <Text className="text-lg font-semibold">
                {t("privacy.title") || "Политика конфиденциальности"}
              </Text>
              <Text className="text-sm text-gray-500">
                {t("privacy.description") || "Пожалуйста, ознакомьтесь с нашей политикой конфиденциальности"}
              </Text>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 mb-4">
              {isLoading ? (
                  <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="small" color="#555" />
                    <Text className="text-sm text-gray-500">
                      {t("privacy.loading") || "Загрузка..."}
                    </Text>
                  </View>
              ) : privacyContent ? (
                  <View className="space-y-4">
                    <Text className="text-xs text-gray-400 mb-4">
                      {t("privacy.version")} {privacyContent.version} | {t("privacy.published")}{" "}
                      {new Date(privacyContent.publishedAt).toLocaleDateString()}
                    </Text>
                    <Text className="text-sm">{privacyContent.content}</Text>
                  </View>
              ) : (
                  <View className="space-y-4">
                    <Text className="font-semibold text-base">
                      {t("privacy.general") || "1. Общие положения"}
                    </Text>
                    <Text className="text-sm">
                      {t("privacy.generalContent") ||
                          "Настоящая политика конфиденциальности определяет порядок обработки и защиты информации о пользователях."}
                    </Text>

                    <Text className="font-semibold text-base">
                      {t("privacy.dataCollection") || "2. Сбор данных"}
                    </Text>
                    <Text className="text-sm">
                      {t("privacy.dataCollectionContent") ||
                          "Мы собираем только необходимые данные для предоставления качественного сервиса."}
                    </Text>

                    <Text className="font-semibold text-base">
                      {t("privacy.dataProtection") || "3. Защита данных"}
                    </Text>
                    <Text className="text-sm">
                      {t("privacy.dataProtectionContent") ||
                          "Мы применяем современные технические и организационные меры для защиты ваших данных."}
                    </Text>

                    <Text className="font-semibold text-base">
                      {t("privacy.userRights") || "4. Права пользователей"}
                    </Text>
                    <Text className="text-sm">
                      {t("privacy.userRightsContent") ||
                          "Вы имеете право запрашивать доступ, исправление или удаление ваших персональных данных."}
                    </Text>
                  </View>
              )}
            </ScrollView>

            {/* Footer */}
            <View className="flex-row justify-end space-x-3">
              <Button variant="outline" onPress={onDecline} disabled={isAccepting}>
                {t("privacy.decline") || "Отклонить"}
              </Button>
              <Button onPress={handleAccept} disabled={isAccepting}>
                {isAccepting ? t("privacy.accepting") || "Принимаю..." : t("privacy.accept") || "Принять"}
              </Button>
            </View>

            {/* Close button */}
            <Pressable
                onPress={onDecline}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200"
            >
              <X className="h-5 w-5 text-black" />
            </Pressable>
          </View>
        </View>
      </Modal>
  );
};

export default PrivacyDialog;
