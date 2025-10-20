import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@/hooks/useNavigation";
import { imageService } from "@/services/imageService";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const user = useAuth().user;
  const router = useNavigation();
  const [avatarUri, setAvatarUri] = useState<string | undefined>();

  useEffect(() => {
    if (user?.imageId) {
      imageService
        .getBase64(user.imageId)
        .then(setAvatarUri)
        .catch(console.error);
    }
  }, [user?.imageId]);
  return (
    <View className="h-20 flex-row items-center justify-between px-6">
      {/* Логотип и название */}
      <TouchableOpacity
        onPress={() => router.toDashboard()}
        className="flex-row items-center"
      >
        <Image
          source={require("../../assets/images/logo-3.png")}
          className="w-14 h-14 rounded-full shadow-2xl mr-2"
        />
        <Text className="text-2xl font-bold text-primary shadow-2xl">
          Mate Gym
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => router.toDeveloperSupport}
          className="mx-2"
        >
          <FontAwesome5 name="heart" size={22} color="red" />
        </TouchableOpacity>

        <TouchableOpacity className="mx-2">
          <Feather name="bell" size={22} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.toProfile()} className="mx-2">
          <Image
            source={{ uri: avatarUri }}
            className="w-14 h-14 rounded-full shadow-2xl"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
