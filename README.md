# 🌍 TravelMate AI - Mobile App

A modern travel companion app built with React Native and Expo, featuring AI-powered trip planning and smart travel insights.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on device/simulator
# Press "a" for Android
# Press "i" for iOS
# Press "w" for web (responsive testing)
```

## 🎨 UI Link
https://motiff.com/file/yOIQamMQ6cWWKtJZswAAH2T?nodeId=0%3A1&type=design

## 📱 Features

- **🤖 AI Trip Planning**: Smart travel recommendations
- **🗺️ Interactive Maps**: Explore destinations
- **📊 Travel Insights**: Track your journey statistics
- **🎨 Dark/Light Theme**: Seamless theme switching
- **📱 Responsive Design**: Optimized for all screen sizes
- **🔐 Secure Authentication**: Multiple login options

## 🛠️ Tech Stack

- **Framework**: React Native + Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Redux Toolkit
- **Navigation**: Expo Router (File-based routing)
- **UI Components**: Custom component library
- **Authentication**: Expo Auth Session
- **Maps**: React Native Maps
- **Icons**: Expo Vector Icons (Ionicons)

## 📁 Project Structure

```
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication screens
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (main)/                   # Main app screens
│   │   ├── index.tsx             # Home screen
│   │   ├── explore.tsx           # Explore screen
│   │   ├── trips.tsx             # Trips management
│   │   └── profile.tsx           # User profile
│   └── _layout.tsx               # Root layout
├── src/
│   ├── components/               # Reusable components
│   │   ├── ui/                   # UI component library
│   │   ├── layouts/              # Layout components
│   │   ├── tabs/                 # Tab navigation
│   │   └── form/                 # Form components
│   ├── features/                 # Feature-specific components
│   │   ├── auth/                 # Authentication features
│   │   ├── homepage/             # Home page features
│   │   └── trips/                # Trip management
│   ├── hooks/                    # Custom React hooks
│   ├── contexts/                 # React contexts
│   ├── redux/                    # Redux store & slices
│   ├── services/                 # API services
│   ├── utils/                    # Utility functions
│   └── styles/                   # Style definitions
├── assets/                       # Static assets
└── android/                      # Android-specific files
```

## 🎨 Design System

### Color Palette

- **Primary**: `#E95D77` (Pink)
- **Secondary**: `#F58601` (Orange)
- **Tertiary**: `#00C5A7` (Teal)
- **Quaternary**: `#FFAD9F` (Light Coral)
- **Grey**: `#737373`

### Typography

- **Font Family**: Inter (Regular, SemiBold, Bold)
- **Text Variants**: h1, h2, title, body, caption

## 🤝 Contributing

1. Follow the coding standards above
2. Use TypeScript for type safety
3. Write clean, readable component code
4. Test on both Android and iOS
5. Ensure responsive design works

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ NhanBernie for modern travel experiences.
