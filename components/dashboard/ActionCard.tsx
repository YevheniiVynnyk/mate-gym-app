import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CardUI, cn } from "@/components/ui/CardUI";

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

/**
 * ActionCard - Компонент для быстрых действий на дашборде.
 *
 * Использует CardUI для адаптивности к темам.
 */
export function ActionCard({ icon, label, onPress }: ActionCardProps) {
  return (
    // ✅ ИСПОЛЬЗУЕМ CardUI ВМЕСТО View
    // CardUI автоматически управляет bg, border, shadow и text-color
    // w-[48%] - для создания двух колонок.
    // p-4, rounded-lg, mb-2 - эти стили теперь управляются CardUI.
    // Я оставляю mb-2, т.к. CardUI имеет mb-4 по умолчанию, и нам нужен меньший отступ
    // между карточками действий.
    <TouchableOpacity
      className="w-[48%] mb-2"
      onPress={onPress}
      // Добавляем небольшой эффект при нажатии
      activeOpacity={0.7}
    >
      <CardUI className="items-center p-4">
        {/* Иконка */}
        {icon}
        {/* Текст. Цвет адаптируется через CardUI */}
        <Text
          className={cn(
            "mt-2 font-semibold text-foreground",
            "dark:text-gray-100 ocean:text-ocean-foreground"
          )}
        >
          {label}
        </Text>
      </CardUI>
    </TouchableOpacity>
  );
}
