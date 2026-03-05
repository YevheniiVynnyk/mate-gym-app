import { useEffect, useState } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

const AD_UNIT_ID = "ca-app-pub-3240569896257496/4535528104";

const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_ID, {
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
