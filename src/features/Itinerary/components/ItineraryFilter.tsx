import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';
import { AppText } from '@/components/ui/AppText';

type FilterOption = 'all' | 'shared';

interface ItineraryFilterProps {
  onFilterChange?: (filter: FilterOption) => void;
}

const ItineraryFilter = ({ onFilterChange }: ItineraryFilterProps) => {
  const { colors } = useTheme();
  // Note: When migrating to Redux Toolkit, remove this local state
  // and instead use a selector to get the active filter from the global state
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const handleFilterPress = (filter: FilterOption) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  // These will be removed when migrating to Redux Toolkit
  const getButtonStyle = (filter: FilterOption) => {
    const isActive = activeFilter === filter;
    return {
      backgroundColor: isActive ? colors.primaryColor : 'transparent',
      borderColor: colors.primaryColor,
    };
  };

  const getTextStyle = (filter: FilterOption) => {
    const isActive = activeFilter === filter;
    return {
      color: isActive ? '#FFFFFF' : colors.primaryColor,
    };
  };

  const getButtonClasses = (filter: FilterOption) => {
    return cn(
      'px-6 py-2 rounded-full border items-center justify-center transition-colors transform-duration-800',
    );
  };

  return (
    <View className="flex-row justify-start py-3 gap-3">
      <TouchableOpacity
        className={getButtonClasses('all')}
        style={getButtonStyle('all')}
        onPress={() => handleFilterPress('all')}
        activeOpacity={0.8}
      >
        <AppText style={getTextStyle('all')} weight="medium">
          All
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        className={getButtonClasses('shared')}
        style={getButtonStyle('shared')}
        onPress={() => handleFilterPress('shared')}
        activeOpacity={0.8}
      >
        <AppText style={getTextStyle('shared')} weight="medium">
          Shared
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default ItineraryFilter;
