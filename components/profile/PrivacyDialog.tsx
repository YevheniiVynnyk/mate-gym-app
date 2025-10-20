import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type PrivacyDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function PrivacyDialog({ open, onClose }: PrivacyDialogProps) {
  return (
    <Modal transparent visible={open} animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white p-5 rounded-lg w-4/5 items-center">
          <Text className="text-lg font-bold mb-2">Приватность</Text>
          <Text className="text-sm text-center mb-5">
            Здесь можно управлять настройками приватности и доступом к вашим
            данным.
          </Text>
          <TouchableOpacity
            className="bg-blue-600 px-5 py-2 rounded-md"
            onPress={onClose}
          >
            <Text className="text-white font-bold">Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
