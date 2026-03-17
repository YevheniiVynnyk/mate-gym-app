import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { User, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInputUI } from "@/components/ui/TextInputUI";
import { imageService } from "@/services/imageService";

interface Props {
  data: { firstName?: string; lastName?: string };
  updateData: (key: string, value: any) => void;
}

export const ProfileStep: React.FC<Props> = ({ data, updateData }) => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setUploading(true);
        const asset = result.assets[0];
        setAvatarUri(asset.uri);
        
        const fileData = {
          uri: asset.uri,
          type: asset.mimeType || "image/jpeg",
          name: asset.fileName || "avatar.jpg",
        };

        const id = await imageService.upload(fileData);
        updateData("imageId", id);
      }
    } catch (e) {
      console.error("Failed to upload image", e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="items-center w-full">
      <Text className="text-2xl font-bold mb-2 text-center text-foreground dark:text-gray-100">
        Let's set up your profile
      </Text>
      <Text className="text-sm text-center text-muted-foreground mb-6">
        Add a photo and your name so trainers can recognize you.
      </Text>

      <TouchableOpacity onPress={pickImage} className="mb-6 relative">
        <View className="w-24 h-24 rounded-full bg-secondary/50 items-center justify-center overflow-hidden border-2 border-dashed border-primary/50">
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} className="w-full h-full" />
          ) : (
            <User size={40} className="text-muted-foreground" />
          )}
          {uploading && (
            <View className="absolute inset-0 bg-black/30 items-center justify-center">
              <ActivityIndicator color="white" />
            </View>
          )}
        </View>
        <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full shadow-sm">
          <Camera size={14} color="white" />
        </View>
      </TouchableOpacity>

      <View className="w-full space-y-4">
        <TextInputUI
          placeholder="First Name"
          value={data.firstName}
          onChangeText={(t) => updateData("firstName", t)}
        />
        <TextInputUI
          placeholder="Last Name"
          value={data.lastName}
          onChangeText={(t) => updateData("lastName", t)}
        />
      </View>
    </View>
  );
};
