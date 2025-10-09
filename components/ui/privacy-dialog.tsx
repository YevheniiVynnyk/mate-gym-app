import React from "react";
import {
  Modal,
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import { Shield, Eye, Lock, FileText, Users, Database, X } from "lucide-react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface PrivacyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyDialog: React.FC<PrivacyDialogProps> = ({ open, onOpenChange }) => {
  return (
      <Modal
          visible={open}
          animationType="slide"
          transparent
          onRequestClose={() => onOpenChange(false)}
      >
        <StyledView className="flex-1 bg-black/50 justify-center items-center">
          <StyledView className="bg-white rounded-lg max-h-[90%] w-[90%] p-4">

            {/* Header */}
            <StyledView className="flex-row items-center justify-between mb-4">
              <StyledView className="flex-row items-center">
                <Shield className="h-6 w-6 text-blue-500" />
                <StyledText className="text-lg font-bold ml-2">
                  Политика конфиденциальности и пользовательское соглашение
                </StyledText>
              </StyledView>
              <StyledPressable onPress={() => onOpenChange(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </StyledPressable>
            </StyledView>

            <StyledText className="text-sm text-gray-600 mb-2">
              Условия использования приложения Mate Gym и обработки персональных данных
            </StyledText>

            {/* Content */}
            <ScrollView className="flex-1">
              <StyledView className="space-y-6">

                {/* Section Example */}
                <Section icon={<FileText className="h-5 w-5 text-blue-500" />} title="1. Общие положения">
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях
                    мобильного приложения Mate Gym. Используя наше приложение, вы соглашаетесь с условиями данной политики.
                  </Text>
                </Section>

                <Section icon={<Database className="h-5 w-5 text-blue-500" />} title="2. Сбор и использование персональных данных">
                  <Text className="text-sm text-gray-600">
                    Мы собираем данные: имя, email, телефон, параметры тела и данные тренировок.
                  </Text>
                </Section>

                <Section icon={<Lock className="h-5 w-5 text-blue-500" />} title="3. Защита персональных данных">
                  <Text className="text-sm text-gray-600">
                    Мы используем шифрование, резервное копирование и ограничение доступа для защиты ваших данных.
                  </Text>
                </Section>

                <Section icon={<Users className="h-5 w-5 text-blue-500" />} title="4. Права пользователей">
                  <Text className="text-sm text-gray-600">
                    Вы имеете право получать информацию, исправлять или удалять ваши персональные данные.
                  </Text>
                </Section>

                <Section icon={<Eye className="h-5 w-5 text-blue-500" />} title="5. Cookies и аналитика">
                  <Text className="text-sm text-gray-600">
                    Мы используем cookies для улучшения функциональности и персонализации контента.
                  </Text>
                </Section>

                <Section title="6. Передача данных третьим лицам">
                  <Text className="text-sm text-gray-600">
                    Мы не передаем ваши данные третьим лицам без согласия, за исключением законных требований.
                  </Text>
                </Section>

                <Section title="7. Изменения в политике">
                  <Text className="text-sm text-gray-600">
                    Мы можем обновлять политику и уведомлять пользователей через приложение или email.
                  </Text>
                </Section>

                <Section title="8. Контактная информация">
                  <Text className="text-sm text-gray-600">
                    Email: privacy@mategym.com
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Адрес: г. Москва, ул. Фитнес, д. 1
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Телефон: +7 (999) 123-45-67
                  </Text>
                </Section>

                <StyledText className="text-center text-xs text-gray-500">
                  Дата последнего обновления: 15 сентября 2025 года
                </StyledText>
                <StyledText className="text-center text-xs text-gray-500">
                  © 2025 Mate Gym. Все права защищены.
                </StyledText>
              </StyledView>
            </ScrollView>
          </StyledView>
        </StyledView>
      </Modal>
  );
};

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  return (
      <StyledView className="space-y-2">
        <StyledView className="flex flex-row items-center gap-2 mb-1">
          {icon}
          <StyledText className="text-lg font-semibold">{title}</StyledText>
        </StyledView>
        {children}
      </StyledView>
  );
};
