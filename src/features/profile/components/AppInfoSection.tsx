import { View, Pressable } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";

const AppInfoSection = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-200">
      <Pressable className="flex-row items-center justify-between py-3">
        <View className="flex-row items-center">
          <Ionicons name="information-circle-outline" size={24} color={colors.greyColor} />
          <AppText variant="body" className="ml-3">
            {t("profile.about")}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.greyColorLight} />
      </Pressable>

      <View className="h-px bg-gray-200 my-2" />

      <Pressable className="flex-row items-center justify-between py-3">
        <View className="flex-row items-center">
          <Ionicons name="document-text-outline" size={24} color={colors.greyColor} />
          <AppText variant="body" className="ml-3">
            {t("profile.terms")}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.greyColorLight} />
      </Pressable>

      <View className="h-px bg-gray-200 my-2" />

      <Pressable className="flex-row items-center justify-between py-3">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.greyColor} />
          <AppText variant="body" className="ml-3">
            {t("profile.privacy")}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.greyColorLight} />
      </Pressable>
    </View>
  );
};

export default AppInfoSection;
