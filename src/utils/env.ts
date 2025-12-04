const createEnvConfig = () => {
  const baseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    "https://nonornamentally-oppressible-kindra.ngrok-free.dev";
  const timeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000;
  return {
    API: { BASE_URL: baseUrl, TIMEOUT: timeout },
    AUTH: {
      GOOGLE: {
        WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      },
    },
  };
};

export const ENV = createEnvConfig();
