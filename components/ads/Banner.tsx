import React from "react";
import { View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const BANNER_ID = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-3240569896257496/7476643955";

type BottomBannerProps = {
  size?: BannerAdSize | string;
};

export default function Banner({ size }: BottomBannerProps) {
  const bannerSize = size || BannerAdSize.BANNER;

  return (
    <View className="w-full items-center">
      <BannerAd
        unitId={BANNER_ID}
        size={bannerSize}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
