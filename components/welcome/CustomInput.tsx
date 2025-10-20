import { TextInput } from "react-native";

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: any) => (
  <TextInput
    className="border-gray-200 rounded-lg p-4 bg-background text-base text-foreground"
    placeholder={placeholder}
    placeholderTextColor="#888"
    value={value}
    secureTextEntry={secureTextEntry}
    onChangeText={onChangeText}
  />
);
export default CustomInput;
