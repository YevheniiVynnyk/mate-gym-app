import { TextInput } from "react-native";
import React from "react"; // Не забывайте импортировать React

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
