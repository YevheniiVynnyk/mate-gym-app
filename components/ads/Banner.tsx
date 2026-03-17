import React, { useState } from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import ENV from "@/config/env";

type BottomBannerProps = {
  size?: BannerAdSize | string;
};

export default function Banner({ size }: BottomBannerProps) {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const bannerSize = size || BannerAdSize.ANCHORED_ADAPTIVE_BANNER;

  if (hasError) {
    return null;
  }

  return (
    <View className={`w-full items-center ${isAdLoaded ? "flex" : "hidden"}`}>
      <BannerAd
        unitId={ENV.BANNER_AD_ID!}
        size={bannerSize}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log("Banner Ad Loaded");
          setIsAdLoaded(true);
        }}
        onAdFailedToLoad={(error) => {
          console.error("Banner Ad Failed to Load", error);
          setHasError(true);
          setIsAdLoaded(false);
        }}
      />
    </View>
  );
}
