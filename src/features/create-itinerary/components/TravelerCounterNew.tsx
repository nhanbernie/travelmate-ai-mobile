import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

interface TravelerCounterProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const TravelerCounterNew: React.FC<TravelerCounterProps> = ({
  value,
  onValueChange,
  min = 1,
  max = 20,
}) => {
  const { t } = useTranslation();

  const handleDecrease = () => {
    if (value > min) {
      onValueChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onValueChange(value + 1);
    }
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Ionicons name="people-outline" size={20} color="#333" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          {t("itinerary.form.travelers.label")}
        </AppText>
      </View>

      <View className="bg-white rounded-xl p-4 flex-row items-center justify-center border border-gray-200">
        <TouchableOpacity
          className={`w-10 h-10 rounded-full bg-gray-100 items-center justify-center ${
            value <= min ? "opacity-50" : ""
          }`}
          onPress={handleDecrease}
          disabled={value <= min}
        >
          <Ionicons name="remove" size={20} color={value <= min ? "#ccc" : "#333"} />
        </TouchableOpacity>

        <View className="mx-8 items-center">
          <Text className="text-2xl font-bold text-gray-900">{value}</Text>
          <Text className="text-sm text-gray-600 mt-1">{t("itinerary.form.travelers.count")}</Text>
        </View>

        <TouchableOpacity
          className={`w-10 h-10 rounded-full bg-gray-100 items-center justify-center ${
            value >= max ? "opacity-50" : ""
          }`}
          onPress={handleIncrease}
          disabled={value >= max}
        >
          <Ionicons name="add" size={20} color={value >= max ? "#ccc" : "#333"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
