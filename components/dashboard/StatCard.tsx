import React from "react";
import { Text, View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  cn,
} from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  className?: string;
}

/**
 * StatCard - Компонент для отображения ключевых метрик на дашборде.
 *
 * Использует структурированные компоненты CardUI для автоматической
 * адаптации к темам (light, dark, ocean).
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  className,
}) => {
  return (
    // CardUI используется как корневой элемент.
    // Занимает примерно 1/3 ширины и имеет внутренний отступ p-3.
    <Card className={cn("w-[32%] p-3 items-start", className)}>
      {/* Используем CardContent, но с нулевым отступом, чтобы управлять им вручную */}
      <CardContent className="p-0 pt-0">
        {/* Большое значение метрики. Цвет должен быть ярким, например, primary/зеленый */}
        <Text
          className="text-3xl font-bold text-primary mb-1 
                     dark:text-green-400 
                     ocean:text-ocean-primary"
        >
          {value}
        </Text>

        {/* Заголовок метрики. Используем CardDescription для приглушенного цвета. */}
        <CardDescription className="text-xs font-semibold mb-1">
          {title}
        </CardDescription>

        {/* Дополнительная информация/подзаголовок (например, процент или среднее время) */}
        {subtitle && (
          <Text
            // Более приглушенный текст для второстепенной информации
            className="text-xs text-gray-400 dark:text-gray-500 ocean:text-ocean-foreground/60"
          >
            {subtitle}
          </Text>
        )}
      </CardContent>
    </Card>
  );
};
