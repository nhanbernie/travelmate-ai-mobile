import { Pressable } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { SPRING_CONFIG } from '@/utils/reanimatedConfig';

interface TabBarButtonProps {
  isFocused: boolean;
  label: string;
  routeName: 'index' | 'explore' | 'create' | 'profile' | 'trips' | string;
  color: string;
  onPress?: () => void;
  onLongPress?: () => void;
  accessibilityLabel?: string;
  testID?: string;
  style?: any;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(isFocused ? 1 : 0);

  // Memoize icon name to prevent unnecessary re-renders
  const iconName = useMemo(() => {
    switch (routeName) {
      case 'index':
        return 'home-outline';
      case 'explore':
        return 'compass-outline';
      case 'create':
        return 'add-circle-outline';
      case 'trips':
        return 'map-outline';
      default:
        return 'person-outline';
    }
  }, [routeName]);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      SPRING_CONFIG
    );
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    'worklet';
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => {
    'worklet';
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  }, []);
  return (
    <Pressable {...props} className="flex-1 justify-center items-center gap-1">
      <Animated.View style={[animatedIconStyle]}>
        <Ionicons name={iconName} size={26} color={color} />
      </Animated.View>

      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;
