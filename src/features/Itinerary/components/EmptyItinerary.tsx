import { View, Image } from "react-native";
import React from "react";
import { AppText, AppButton } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useTranslation } from "react-i18next";

const EmptyItinerary = () => {
  const { colors } = useTheme();
  const { navigate } = useSafeNavigation();
  const { t } = useTranslation();

  const handleCreateTrip = () => {
    navigate("/trips/create");
  };

  return (
    <View className="flex-1 items-center justify-center px-6 py-10">
      {/* Illustration */}
      <Image
        source={require("../../../../assets/illustrations/empty-itinerary.png")}
        style={{ width: 280, height: 280 }}
        resizeMode="contain"
      />

      {/* Title */}
      <AppText
        variant="h3"
        className="text-center mt-6 mb-3"
        style={{ color: colors.primaryColor }}
      >
        {t("itinerary.emptyTitle")}
      </AppText>

      {/* Description */}
      <AppText variant="body" className="text-center text-gray-600 mb-8 px-4 leading-6">
        {t("itinerary.emptyDescription")}
      </AppText>

      {/* CTA Button */}
      <AppButton
        title={t("itinerary.createFirstTrip")}
        onPress={handleCreateTrip}
        className="py-4 px-8 rounded-3xl shadow-lg"
        style={{
          backgroundColor: colors.primaryColor,
          shadowColor: colors.primaryColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        textClassName="text-white font-semibold text-base"
        startIcon={<Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />}
      />
    </View>
  );
};

export default EmptyItinerary;
