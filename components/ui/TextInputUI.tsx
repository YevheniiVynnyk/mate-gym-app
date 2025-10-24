import React from "react";
import { TextInput, TextInputProps } from "react-native";
// 💡 Используем useTheme для получения текущей темы
import { useTheme } from "@/contexts/ThemeContext";

// Утилита для условного объединения классов (аналог clsx)
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Расширяем пропсы, чтобы включить className и другие стандартные пропсы TextInput
interface TextInputUIProps extends TextInputProps {
  className?: string;
}

const TextInputUI = React.forwardRef<TextInput, TextInputUIProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    const { theme } = useTheme();

    // 1. Объединение базовых и адаптивных классов
    const combinedClasses = cn(
      // Базовые стили: рамка, скругление, отступы, цвет текста по умолчанию
      "border border-border rounded-md p-2 mb-2 text-foreground",

      // ✅ Адаптивные стили для Dark темы (фон, рамка, цвет текста)
      "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",

      // ✅ Адаптивные стили для Ocean темы (фон, рамка, цвет текста)
      "ocean:bg-ocean-input ocean:border-blue-800 ocean:text-ocean-foreground",

      className // Пользовательские классы
    );

    // 2. Логика цвета плейсхолдера на основе темы (управляемая хуком useTheme)
    const placeholderColor = React.useMemo(() => {
      switch (theme) {
        case "ocean":
          return "#6699cc";
        case "dark":
          return "#9ca3af"; // gray-400
        default:
          return "#a1a1aa"; // zinc-400 (Light theme default)
      }
    }, [theme]);

    // 3. Возвращаем компонент TextInput с примененными стилями и цветом плейсхолдера
    return (
      <TextInput
        ref={ref}
        className={combinedClasses}
        placeholderTextColor={placeholderColor}
        {...rest}
      />
    );
  }
);

TextInputUI.displayName = "TextInputUI";

export { TextInputUI };
