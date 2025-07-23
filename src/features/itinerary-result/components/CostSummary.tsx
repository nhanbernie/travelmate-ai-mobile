import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';

interface CostSummaryProps {
  totalCost: number;
  numberOfTravelers: number;
}

export const CostSummary: React.FC<CostSummaryProps> = ({ 
  totalCost, 
  numberOfTravelers 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const costPerPerson = totalCost / numberOfTravelers;

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200">
      <View className="flex-row items-center mb-4">
        <Ionicons name="calculator-outline" size={20} color="#10b981" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          Cost Summary
        </AppText>
      </View>

      <View className="gap-3">
        {/* Total Cost */}
        <View className="flex-row items-center justify-between p-3 bg-green-50 rounded-xl">
          <View className="flex-row items-center">
            <Ionicons name="card-outline" size={16} color="#10b981" />
            <Text className="text-sm font-medium text-green-800 ml-2">
              Total Estimated Cost
            </Text>
          </View>
          <Text className="text-lg font-bold text-green-600">
            {formatCurrency(totalCost)}
          </Text>
        </View>

        {/* Cost Per Person */}
        <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-xl">
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text className="text-sm text-gray-700 ml-2">
              Cost per person
            </Text>
          </View>
          <Text className="text-base font-semibold text-gray-800">
            {formatCurrency(costPerPerson)}
          </Text>
        </View>

        {/* Travelers Count */}
        <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-xl">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text className="text-sm text-gray-700 ml-2">
              Number of travelers
            </Text>
          </View>
          <Text className="text-base font-semibold text-gray-800">
            {numberOfTravelers}
          </Text>
        </View>
      </View>

      {/* Disclaimer */}
      <View className="bg-amber-50 p-3 rounded-xl mt-4">
        <View className="flex-row items-start">
          <Ionicons name="information-circle-outline" size={16} color="#f59e0b" />
          <Text className="text-xs text-amber-700 ml-2 flex-1 leading-4">
            Costs are estimates and may vary. Actual prices depend on season, availability, and personal choices.
          </Text>
        </View>
      </View>
    </View>
  );
};
