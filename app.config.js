module.exports = {
  expo: {
    name: "Schedoryn",
    slug: "schedoryn",
    description: "A travel companion app that uses AI to help plan trips.",
    version: "1.0.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.nhanbernie.boltexponativewind",
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    web: {
      bundler: "metro",
      output: "single",
      // favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      "expo-web-browser",
      "expo-secure-store",
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme: "com.googleusercontent.apps.97989046013-qbaut7u4jil77bcmeieq6ksdkms0gbh1",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    android: {
      package: "com.nhanbernie.boltexponativewind",
      softwareKeyboardLayoutMode: "pan",
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
    },
    owner: "berniework",
    extra: {
      router: {},
      eas: {
        projectId: "001ae5c4-a596-4d43-85fd-2c414cb63ee4",
      },
    },
  },
};
