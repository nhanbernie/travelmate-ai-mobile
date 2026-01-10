./gradlew signingReport

eas build -p android
eas build --platform android --profile development

npx expo prebuild --clean

.\gradlew clean
