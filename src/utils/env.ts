const createEnvConfig = () => {
  const baseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    'https://travelmate-ai-server.onrender.com';
  const timeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000;
  return {
    API: { BASE_URL: baseUrl, TIMEOUT: timeout },
    AUTH: {
      GOOGLE: {
        CLIENT_ID: process.env.EXPO_CLIENT_ID,
        IOS_ID: process.env.EXPO_IOS_CLIENT_ID,
        ANDROID_ID: process.env.EXPO_ANDROID_CLIENT_ID,
      },
    },
  };
};

export const ENV = createEnvConfig();
