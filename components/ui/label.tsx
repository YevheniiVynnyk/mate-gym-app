import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconProps } from "lucide-react-native"; // типы для иконок

interface LabelProps {
  icon: React.FC<IconProps>; // иконка из lucide-react-native
  text: string;
  color?: string; // опционально цвет иконки
  size?: number; // опционально размер иконки
}

const Label: React.FC<LabelProps> = ({
  icon: IconComponent,
  text,
  color = "#3B82F6",
  size = 20,
}) => {
  return (
    <View style={styles.container}>
      <IconComponent size={size} color={color} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#171717", // основной цвет текста
  },
});

export default Label;
