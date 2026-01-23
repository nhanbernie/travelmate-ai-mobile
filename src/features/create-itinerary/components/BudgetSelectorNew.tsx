import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

interface BudgetRange {
  id: string;
  value: string;
  translationKey: string;
}

interface BudgetSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const budgetRanges: BudgetRange[] = [
  {
    id: "1",
    value: "1000000",
    translationKey: "under100",
  },
  {
    id: "2",
    value: "2000000",
    translationKey: "range100to200",
  },
  {
    id: "3",
    value: "4000000",
    translationKey: "range200to400",
  },
  {
    id: "4",
    value: "8000000",
    translationKey: "above400",
  },
];

export const BudgetSelectorNew: React.FC<BudgetSelectorProps> = ({ value, onValueChange }) => {
  const { t } = useTranslation();

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Ionicons name="card-outline" size={20} color="#333" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          {t("itinerary.form.budget.label")}
        </AppText>
      </View>

      <View className="gap-3">
        {budgetRanges.map((range) => (
          <TouchableOpacity
            key={range.id}
            className={`bg-white rounded-xl p-4 border-2 ${
              value === range.value ? "border-[#E95D77] bg-green-50" : "border-gray-200"
            }`}
            onPress={() => onValueChange(range.value)}
          >
            <Text
              className={`text-base font-semibold mb-1 ${
                value === range.value ? "text-[#E95D77]" : "text-gray-700"
              }`}
            >
              {t(`itinerary.form.budget.${range.translationKey}.label`)}
            </Text>
            <Text
              className={`text-sm ${value === range.value ? "text-[#E95D77]" : "text-gray-500"}`}
            >
              {t(`itinerary.form.budget.${range.translationKey}.description`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
