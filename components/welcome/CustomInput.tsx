import { TextInput, TextInputProps } from "react-native";
import React from "react"; // Не забывайте импортировать React

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
    className="border-gray-200 rounded-lg p-4 bg-background text-base text-foreground"
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
