import React from "react";
import { Text, TextProps, View, ViewProps } from "react-native";

// Утилита для условного объединения классов (аналог clsx)
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

const Card = React.forwardRef<View, ViewProps>((props, ref) => {
  const { className, ...rest } = props;

  const combinedClasses = cn(
    // Основные стили карточки.
    "rounded-lg border-none shadow-lx ",

    // ✅ ИСПРАВЛЕНИЕ ТЕМЫ: Добавлены явные классы для переключения фона и текста
    // в Dark и Ocean режимах, чтобы обеспечить адаптивность.
    // Default (Light)
    "bg-card text-card-foreground",
    // Dark theme overrides
    "dark:bg-gray-800 dark:text-gray-100",
    // Ocean theme overrides
    "ocean:bg-ocean-card ocean:text-ocean-foreground",

    className
  );

  return <View ref={ref} className={combinedClasses} {...rest} />;
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, ViewProps>((props, ref) => {
  const { className, ...rest } = props;

  const combinedClasses = cn("flex flex-col space-y-1.5 p-4", className);

  return <View ref={ref} className={combinedClasses} {...rest} />;
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, TextProps>((props, ref) => {
  const { className, ...rest } = props;

  const combinedClasses = cn(
    // text-foreground обеспечивает адаптацию цвета текста
    "text-2xl leading-none tracking-tight text-foreground",
    // ✅ ИСПРАВЛЕНИЕ ТЕМЫ: Явно указываем цвета для тем, чтобы текст был светлым в Dark
    "dark:text-gray-100 ocean:text-ocean-foreground",
    className
  );

  return <Text ref={ref} className={combinedClasses} {...rest} />;
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, TextProps>((props, ref) => {
  const { className, ...rest } = props;

  // text-muted-foreground обеспечивает адаптацию приглушенного цвета текста
  const combinedClasses = cn("text-sm text-muted-foreground", className);

  return <Text ref={ref} className={combinedClasses} {...rest} />;
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, ViewProps>((props, ref) => {
  const { className, ...rest } = props;

  const combinedClasses = cn("p-4 pt-0", className);

  return <View ref={ref} className={combinedClasses} {...rest} />;
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, ViewProps>((props, ref) => {
  const { className, ...rest } = props;

  const combinedClasses = cn("flex flex-row items-center p-6 pt-0", className);

  return <View ref={ref} className={combinedClasses} {...rest} />;
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cn,
};
