import { StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import TabBarButton from './TabBarButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScrollContext } from '@/contexts/ScrollContext';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { isScrollingDown } = useScrollContext();

  // Animation for tab bar visibility
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the tab bar when scrolling direction changes
    Animated.spring(translateY, {
      toValue: isScrollingDown ? 100 : 0, // Move down (hide) when scrolling down
      useNativeDriver: true,
      friction: 6,
      tension: 100,
      restSpeedThreshold: 0.01,
      restDisplacementThreshold: 0.01,
    }).start();
  }, [isScrollingDown]);

  return (
    <Animated.View
      style={[
        styles.tabbar,
        {
          bottom: insets.bottom + 5,
          transform: [{ translateY }],
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let label: string;

        if (typeof options.tabBarLabel === 'string') {
          label = options.tabBarLabel;
        } else if (typeof options.title === 'string') {
          label = options.title;
        } else {
          label = route.name;
        }

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? colors.primaryColor : colors.greyColorLight}
            label={label}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5,
    zIndex: 1000,
  },
});

export default TabBar;
