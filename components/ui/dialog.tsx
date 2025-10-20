import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { X } from "lucide-react-native";
import { cn } from "@/lib/utils"; // если нужно, можно заменить на tailwind-стили напрямую

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center p-4">
        <View className="bg-white rounded-lg max-w-lg w-full p-6 relative">
          {children}
          <Pressable
            onPress={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200"
          >
            <X className="h-5 w-5 text-black" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const DialogHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <View className={cn("flex flex-col space-y-1.5", className)}>{children}</View>
);

export const DialogFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <View className={cn("flex flex-row justify-end space-x-2 mt-4", className)}>
    {children}
  </View>
);

export const DialogTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <Text className={cn("text-lg font-semibold", className)}>{children}</Text>
);

export const DialogDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <Text className={cn("text-sm text-gray-500", className)}>{children}</Text>
);

export const DialogContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ScrollView className={cn("max-h-[80%] w-full", className)}>
    {children}
  </ScrollView>
);
