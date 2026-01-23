import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

interface Preference {
  id: string;
  translationKey: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface PreferencesSelectorProps {
  value: string[];
  onValueChange: (value: string[]) => void;
}

const availablePreferences: Preference[] = [
  {
    id: "văn hóa",
    translationKey: "culture",
    icon: "library-outline",
  },
  {
    id: "thức ăn",
    translationKey: "food",
    icon: "restaurant-outline",
  },
  {
    id: "thiên nhiên",
    translationKey: "nature",
    icon: "leaf-outline",
  },
  {
    id: "phiêu lưu",
    translationKey: "adventure",
    icon: "trail-sign-outline",
  },
  {
    id: "nghỉ dưỡng",
    translationKey: "relaxation",
    icon: "sunny-outline",
  },
  {
    id: "mua sắm",
    translationKey: "shopping",
    icon: "bag-outline",
  },
  {
    id: "đời sống đêm",
    translationKey: "nightlife",
    icon: "moon-outline",
  },
  {
    id: "lịch sử",
    translationKey: "history",
    icon: "time-outline",
  },
];

export const PreferencesSelectorNew: React.FC<PreferencesSelectorProps> = ({
  value,
  onValueChange,
}) => {
  const { t } = useTranslation();

  const togglePreference = (preferenceId: string) => {
    if (value.includes(preferenceId)) {
      onValueChange(value.filter((id) => id !== preferenceId));
    } else {
      onValueChange([...value, preferenceId]);
    }
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-1">
        <Ionicons name="heart-outline" size={20} color="#333" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          {t("itinerary.form.preferences.label")}
        </AppText>
      </View>
      <AppText variant="body" className="text-gray-600 mb-3 text-sm">
        {t("itinerary.form.preferences.subtitle")}
      </AppText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
        <View className="flex-row gap-2 pr-4">
          {availablePreferences.map((preference) => {
            const isSelected = value.includes(preference.id);
            return (
              <TouchableOpacity
                key={preference.id}
                className={`bg-white rounded-full px-4 py-3 items-center border-2 min-w-20 ${
                  isSelected ? "border-[#E95D77] bg-purple-50" : "border-gray-200"
                }`}
                onPress={() => togglePreference(preference.id)}
              >
                <Ionicons
                  name={preference.icon}
                  size={20}
                  color={isSelected ? "#E95D77" : "#666"}
                  style={{ marginBottom: 4 }}
                />
                <Text
                  className={`text-xs font-medium text-center ${
                    isSelected ? "text-[#E95D77]" : "text-gray-600"
                  }`}
                >
                  {t(`itinerary.form.preferences.${preference.translationKey}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {value.length > 0 && (
        <View className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
          <Text className="text-sm font-medium text-gray-800 mb-1">Selected ({value.length}):</Text>
          <Text className="text-sm text-gray-600">
            {value
              .map((id) => {
                const pref = availablePreferences.find((p) => p.id === id);
                return pref ? t(`itinerary.form.preferences.${pref.translationKey}`) : id;
              })
              .filter(Boolean)
              .join(", ")}
          </Text>
        </View>
      )}
    </View>
  );
};
