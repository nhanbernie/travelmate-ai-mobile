import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';

interface BudgetRangeProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
}

const BudgetRange: React.FC<BudgetRangeProps> = ({
  value,
  onValueChange,
  minimumValue = 100,
  maximumValue = 10000,
  step = 100,
}) => {
  const { colors } = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBudgetPress = () => {
    // TODO: Implement budget picker modal
    console.log('Budget picker pressed');
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-2">
        <AppText variant="label" className="text-teal-600 font-semibold">
          💰 Budget Range
        </AppText>
        <AppText variant="title" className="text-teal-600 font-bold">
          {formatCurrency(value)}
        </AppText>
      </View>

      <Pressable
        onPress={handleBudgetPress}
        className="bg-teal-50 rounded-xl p-4"
      >
        <View className="flex-row items-center justify-between">
          <AppText variant="body" className="text-gray-500">
            {formatCurrency(minimumValue)}
          </AppText>
          <View className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
            <View
              className="h-2 bg-teal-500 rounded-full"
              style={{
                width: `${
                  ((value - minimumValue) / (maximumValue - minimumValue)) * 100
                }%`,
              }}
            />
          </View>
          <AppText variant="body" className="text-gray-500">
            {formatCurrency(maximumValue)}
          </AppText>
        </View>
      </Pressable>
    </View>
  );
};

export default BudgetRange;
