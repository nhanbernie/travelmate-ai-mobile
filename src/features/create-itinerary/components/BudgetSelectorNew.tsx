import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';

interface BudgetRange {
  id: string;
  label: string;
  value: string;
  description: string;
}

interface BudgetSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const budgetRanges: BudgetRange[] = [
  {
    id: '1',
    label: 'Under $100',
    value: '1000000',
    description: 'Budget-friendly options',
  },
  {
    id: '2',
    label: '$100 - $200',
    value: '2000000',
    description: 'Most popular choice',
  },
  {
    id: '3',
    label: '$200 - $400',
    value: '4000000',
    description: 'Comfortable spending',
  },
  {
    id: '4',
    label: 'Above $400',
    value: '8000000',
    description: 'Premium experience',
  },
];

export const BudgetSelectorNew: React.FC<BudgetSelectorProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Ionicons name="card-outline" size={20} color="#333" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          Budget Range
        </AppText>
      </View>

      <View className="gap-3">
        {budgetRanges.map((range) => (
          <TouchableOpacity
            key={range.id}
            className={`bg-white rounded-xl p-4 border-2 ${
              value === range.value
                ? 'border-[#E95D77] bg-green-50'
                : 'border-gray-200'
            }`}
            onPress={() => onValueChange(range.value)}
          >
            <Text
              className={`text-base font-semibold mb-1 ${
                value === range.value ? 'text-[#E95D77]' : 'text-gray-700'
              }`}
            >
              {range.label}
            </Text>
            <Text
              className={`text-sm ${
                value === range.value ? 'text-[#E95D77]' : 'text-gray-500'
              }`}
            >
              {range.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
