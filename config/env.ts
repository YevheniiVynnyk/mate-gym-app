// A simple configuration file to manage environment variables.
// This makes it easy to switch between development and production settings.

const ENV = {
  // API URL
  API_URL: process.env.EXPO_PUBLIC_API_URL,

  // AdMob Unit IDs
  BANNER_AD_ID: process.env.EXPO_PUBLIC_BANNER_AD_ID,
  INTERSTITIAL_AD_ID: process.env.EXPO_PUBLIC_INTERSTITIAL_AD_ID,
};

// Basic validation to ensure variables are set
if (!ENV.API_URL) {
  throw new Error("Missing environment variable: EXPO_PUBLIC_API_URL");
}
if (!ENV.BANNER_AD_ID) {
  throw new Error("Missing environment variable: EXPO_PUBLIC_BANNER_AD_ID");
}
if (!ENV.INTERSTITIAL_AD_ID) {
  throw new Error("Missing environment variable: EXPO_PUBLIC_INTERSTITIAL_AD_ID");
}

export default ENV;
