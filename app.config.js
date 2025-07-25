module.exports = {
  expo: {
    name: 'TravelMate AI',
    slug: 'travelmateai',
    description: 'A travel companion app that uses AI to help plan trips.',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      bundleIdentifier: 'com.nhanbernie.boltexponativewind',
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    web: {
      bundler: 'metro',
      output: 'single',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-web-browser',
      'expo-secure-store',
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme:
            'com.googleusercontent.apps.97989046013-qbaut7u4jil77bcmeieq6ksdkms0gbh1',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    android: {
      package: 'com.nhanbernie.boltexponativewind',
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff',
      },
    },
    owner: 'nhanbernie',
    extra: {
      router: {},
      eas: {
        projectId: '1ec3fcd4-092e-40d7-9233-0d6955f20f08',
      },
    },
  },
};
