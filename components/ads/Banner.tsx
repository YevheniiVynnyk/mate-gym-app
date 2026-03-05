import React, { useState } from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const BANNER_ID =
  //   __DEV__
  // ? TestIds.BANNER
  // :
  "ca-app-pub-3240569896257496/5895749804";

type BottomBannerProps = {
  size?: BannerAdSize | string;
};

export default function Banner({ size }: BottomBannerProps) {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const bannerSize = size || BannerAdSize.ANCHORED_ADAPTIVE_BANNER;

  if (hasError) {
    return null; // Скрываем баннер при ошибке
  }

  return (
    <View className={`w-full items-center ${isAdLoaded ? "flex" : "hidden"}`}>
      <BannerAd
        unitId={BANNER_ID}
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
