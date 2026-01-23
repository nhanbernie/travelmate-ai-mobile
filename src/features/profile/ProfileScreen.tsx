import { View, ScrollView, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/layouts/ScreenWrapper ";
import { useScrollDetector } from "@/hooks/useScrollDetector";
import { useTranslation } from "react-i18next";
import { AppText } from "@/components/ui/AppText";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useModal } from "@/components/modal";
import LanguageSection from "./components/LanguageSection";
import AppInfoSection from "./components/AppInfoSection";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { scrollHandler, scrollEventThrottle } = useScrollDetector();
  const { logout } = useAuth();
  const { colors } = useTheme();
  const { showConfirm } = useModal();

  const handleLogout = () => {
    showConfirm({
      title: t("profile.logoutConfirm"),
      message: t("profile.logoutMessage"),
      onConfirm: logout,
      variant: "danger",
      confirmText: t("profile.logout"),
      cancelText: t("common.cancel"),
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          {/* Header */}
          <View className="items-center mb-8 mt-4">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: `${colors.primaryColor}20` }}
            >
              <Ionicons name="person" size={48} color={colors.primaryColor} />
            </View>
            <AppText variant="h3" className="mb-1">
              {t("profile.title")}
            </AppText>
            <AppText variant="caption" className="text-gray-500">
              {t("profile.settings")}
            </AppText>
          </View>

          <LanguageSection />

          <AppInfoSection />

          {/* Logout Button */}
          <Pressable
            onPress={handleLogout}
            className="bg-white rounded-3xl p-5 border border-gray-200 flex-row items-center justify-center"
          >
            <Ionicons name="log-out-outline" size={24} color={colors.primaryColor} />
            <AppText
              variant="body"
              className="ml-3 font-semibold"
              style={{ color: colors.primaryColor }}
            >
              {t("profile.logout")}
            </AppText>
          </Pressable>

          {/* Version */}
          <View className="items-center mt-8 mb-4">
            <AppText variant="caption" className="text-gray-400">
              {t("profile.version")} 1.0.1
            </AppText>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
