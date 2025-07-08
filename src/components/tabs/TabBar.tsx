import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import TabBarButton from './TabBarButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/hooks/useTheme';
const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.tabbar]}>
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
            color={isFocused ? colors.primaryColor : colors.greyColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 10,
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
