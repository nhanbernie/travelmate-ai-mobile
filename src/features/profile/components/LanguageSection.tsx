import { View, Pressable } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLanguage } from "@/hooks/language/useLanguage";

const LanguageSection = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageToggle = async () => {
    const newLang = currentLanguage === "en" ? "vi" : "en";
    await changeLanguage(newLang);
  };

  return (
    <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-200">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${colors.secondaryColor}20` }}
          >
            <Ionicons name="language" size={22} color={colors.secondaryColor} />
          </View>
          <View>
            <AppText variant="body" className="font-semibold mb-1">
              {t("profile.language")}
            </AppText>
            <AppText variant="caption" className="text-gray-500">
              {currentLanguage === "en" ? "English" : "Tiếng Việt"}
            </AppText>
          </View>
        </View>
        <Pressable
          onPress={handleLanguageToggle}
          className="flex-row items-center bg-gray-100 rounded-full px-4 py-2"
        >
          <AppText variant="caption" className="font-medium mr-2">
            {currentLanguage === "en" ? "EN" : "VI"}
          </AppText>
          <Ionicons name="swap-horizontal" size={18} color={colors.greyColor} />
        </Pressable>
      </View>
    </View>
  );
};

export default LanguageSection;
