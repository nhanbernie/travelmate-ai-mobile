const createEnvConfig = () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  const timeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT);
  return { API: { BASE_URL: baseUrl, TIMEOUT: timeout } };
};

export const ENV = createEnvConfig();
