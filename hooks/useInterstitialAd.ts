import { useEffect, useState } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";
import ENV from "@/config/env";

const interstitial = InterstitialAd.createForAdRequest(ENV.INTERSTITIAL_AD_ID!, {
  requestNonPersonalizedAdsOnly: true,
});

export const useInterstitialAd = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        interstitial.load(); // Загружаем следующее объявление
      },
    );

    // Начинаем загрузку
    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showAd = () => {
    if (loaded) {
      interstitial.show();
    } else {
      console.log("Interstitial ad not loaded yet");
    }
  };

  return { showAd, loaded };
};
