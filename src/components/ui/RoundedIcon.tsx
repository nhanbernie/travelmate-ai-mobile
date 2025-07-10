import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cn } from '@/utils/cn';

interface RoundedIconProps {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  colorIcon?: string;
  backgroundColor?: string;
  classNameRounded?: string;
  onPress?: () => void;
  onLongPress?: () => void;
}

const RoundedIcon = ({
  iconName,
  size = 24,
  colorIcon = '#E95D77',
  backgroundColor = '#FEE7ED',
  classNameRounded,
  onPress,
  onLongPress,
}: RoundedIconProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
    >
      <View
        className={cn('p-3 rounded-full self-center', classNameRounded)}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Ionicons name={iconName} size={size} color={colorIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default RoundedIcon;
