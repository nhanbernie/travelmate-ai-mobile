import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

interface TripType {
  id: "budget" | "mid-range" | "luxury";
  translationKey: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface TripTypeSelectorProps {
  value: "budget" | "mid-range" | "luxury";
  onValueChange: (value: "budget" | "mid-range" | "luxury") => void;
}

const tripTypes: TripType[] = [
  {
    id: "budget",
    translationKey: "budget",
    icon: "wallet-outline",
  },
  {
    id: "mid-range",
    translationKey: "midRange",
    icon: "star-outline",
  },
  {
    id: "luxury",
    translationKey: "luxury",
    icon: "diamond-outline",
  },
];

export const TripTypeSelectorNew: React.FC<TripTypeSelectorProps> = ({ value, onValueChange }) => {
  const { t } = useTranslation();

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Ionicons name="options-outline" size={20} color="#333" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          {t("itinerary.form.tripType.label")}
        </AppText>
      </View>

      <View className="flex-row justify-between gap-2">
        {tripTypes.map((tripType) => (
          <TouchableOpacity
            key={tripType.id}
            className={`flex-1 bg-white rounded-xl p-4 items-center border-2 ${
              value === tripType.id ? "border-[#E95D77] bg-blue-50" : "border-gray-200"
            }`}
            onPress={() => onValueChange(tripType.id)}
          >
            <Ionicons
              name={tripType.icon}
              size={24}
              color={value === tripType.id ? "#E95D77" : "#666"}
              style={{ marginBottom: 8 }}
            />
            <Text
              className={`text-sm font-semibold mb-1 text-center ${
                value === tripType.id ? "text-[#E95D77]" : "text-gray-700"
              }`}
            >
              {t(`itinerary.form.tripType.${tripType.translationKey}.name`)}
            </Text>
            <Text
              className={`text-xs text-center leading-4 ${
                value === tripType.id ? "text-[#E95D77]" : "text-gray-500"
              }`}
            >
              {t(`itinerary.form.tripType.${tripType.translationKey}.description`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
