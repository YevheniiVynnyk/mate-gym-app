import { useMemo, useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, Edit2, Save, User, Mail, Phone, Hash } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardHeader, CardTitle, cn } from "@/components/ui/Card";
import { TextInputUI } from "@/components/ui/TextInputUI";

export default function UserInfoSection({
  isEditing,
  setIsEditing,
  formDataUser,
  setFormDataUser,
  handleSaveUser,
  setFormDataUserWithAge,
}: any) {
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toISOString().split("T")[0];
    } catch (e) {
      return dateString;
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "set") {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      setFormDataUserWithAge(formattedDate);
    } else if (event.type === "dismissed" && Platform.OS === "ios") {
      setShowDatePicker(false);
    }
  };

  const getIcon = (key: string) => {
    switch (key) {
      case "firstName":
      case "lastName":
      case "login":
        return <User size={18} className="text-muted-foreground" />;
      case "email":
        return <Mail size={18} className="text-muted-foreground" />;
      case "phoneNumber":
        return <Phone size={18} className="text-muted-foreground" />;
      case "age":
        return <Hash size={18} className="text-muted-foreground" />;
      default:
        return <User size={18} className="text-muted-foreground" />;
    }
  };

  const textFields = [
    { placeholder: t("userInfo.placeholder.firstName"), key: "firstName" },
    { placeholder: t("userInfo.placeholder.lastName"), key: "lastName" },
    {
      placeholder: t("userInfo.placeholder.email"),
      key: "email",
      keyboardType: "email-address",
    },
    { placeholder: t("userInfo.placeholder.login"), key: "login" },
    {
      placeholder: t("userInfo.placeholder.phone"),
      key: "phoneNumber",
      keyboardType: "phone-pad",
    },
    {
      placeholder: t("userInfo.placeholder.age"),
      key: "age",
      keyboardType: "numeric",
    },
  ];

  const pickerDate = useMemo(() => {
    if (formDataUser.birthday) {
      try {
        const parts = formDataUser.birthday
          .split("-")
          .map((p: string) => parseInt(p, 10));
        if (parts.length === 3 && !isNaN(parts[0])) {
          return new Date(parts[0], parts[1] - 1, parts[2]);
        }
      } catch (e) {
        console.error("Ошибка парсинга даты рождения:", e);
      }
    }
    return new Date();
  }, [formDataUser.birthday]);

  return (
    <Card className="mb-6 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-3xl border-0 shadow-sm overflow-hidden">
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-border/50 dark:border-gray-700">
        <Text className="text-lg font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          {t("userInfo.header")}
        </Text>
        <TouchableOpacity
          className={cn(
            "p-2 rounded-full",
            isEditing 
              ? "bg-primary/10" 
              : "bg-secondary/50"
          )}
          onPress={() => (isEditing ? handleSaveUser() : setIsEditing(true))}
        >
          {isEditing ? (
            <Save size={20} className="text-primary" />
          ) : (
            <Edit2 size={20} className="text-muted-foreground" />
          )}
        </TouchableOpacity>
      </View>
      
      <View className="p-4 space-y-4">
        {textFields.map((item) => (
          <View key={item.key} className="flex-row items-center bg-secondary/20 dark:bg-gray-900/30 rounded-xl px-4 py-1">
            <View className="mr-3 opacity-70">
              {getIcon(item.key)}
            </View>
            <View className="flex-1">
              <Text className="text-[10px] text-muted-foreground uppercase font-bold mt-2">
                {item.placeholder}
              </Text>
              <TextInputUI
                value={String((formDataUser as any)[item.key] || "")}
                editable={isEditing}
                keyboardType={item.keyboardType as any}
                onChangeText={(text) =>
                  setFormDataUser((prev: any) => ({
                    ...prev,
                    [item.key]: item.key === "age" ? Number(text) : text,
                  }))
                }
                className={cn(
                  "bg-transparent border-0 px-0 py-2 text-base font-medium h-10",
                  !isEditing && "text-foreground/80"
                )}
              />
            </View>
          </View>
        ))}

        <View className="flex-row items-center bg-secondary/20 dark:bg-gray-900/30 rounded-xl px-4 py-3">
          <View className="mr-3 opacity-70">
            <Calendar size={18} className="text-muted-foreground" />
          </View>
          <View className="flex-1">
            <Text className="text-[10px] text-muted-foreground uppercase font-bold">
              {t("userInfo.birthday")}
            </Text>
            <TouchableOpacity
              onPress={() => isEditing && setShowDatePicker(true)}
              disabled={!isEditing}
              className="py-1"
            >
              <Text
                className={cn(
                  "text-base font-medium",
                  formDataUser.birthday
                    ? "text-foreground dark:text-gray-100"
                    : "text-muted-foreground"
                )}
              >
                {formDataUser.birthday
                  ? formatDate(formDataUser.birthday)
                  : t("userInfo.selectDate")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={pickerDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </Card>
  );
}
