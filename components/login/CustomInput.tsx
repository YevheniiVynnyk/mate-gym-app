import React from "react";
import { TextInput, TextInputProps } from "react-native";

type CustomInputProps = TextInputProps & {
  // Вы можете удалить эти явные объявления, так как они уже есть в TextInputProps,
  // но оставляем их для наглядности, если они были в исходном коде.
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  // 💡 Собираем все остальные пропсы (включая autoCapitalize)
  ...rest
}) => (
  <TextInput
    className="border border-gray-200 dark:border-gray-600 ocean:border-blue-700 
      rounded-lg p-4 
      bg-white dark:bg-gray-700 ocean:bg-ocean-input-DEFAULT
      text-base text-black dark:text-gray-100 ocean:text-ocean-foreground"
    placeholder={placeholder}
    placeholderTextColor="#888"
    value={value}
    secureTextEntry={secureTextEntry}
    onChangeText={onChangeText}
    // 💡 Применяем все остальные пропсы
    {...rest}
  />
);

export default CustomInput;
