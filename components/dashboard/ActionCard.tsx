import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, cn } from "@/components/ui/Card";

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
    <TouchableOpacity
      className="w-[48%] mb-2"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Card className="items-center p-4">
        {icon}
        <Text
          className={cn(
            "mt-2 font-semibold text-foreground",
            "dark:text-gray-100 ocean:text-ocean-foreground"
          )}
        >
          {label}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}
