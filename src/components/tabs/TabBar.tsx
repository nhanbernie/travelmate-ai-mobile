import { StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import TabBarButton from "./TabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScrollContext } from "@/contexts/ScrollContext";
import { useTabBarContext } from "@/contexts/TabBarContext";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { isScrollingDown } = useScrollContext();
  const { isTabBarVisible } = useTabBarContext();

  // Animation for tab bar visibility
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the tab bar when scrolling direction changes or visibility changes
    const shouldHide = isScrollingDown || !isTabBarVisible;

    Animated.spring(translateY, {
      toValue: shouldHide ? 100 : 0, // Move down (hide) when scrolling down or not visible
      useNativeDriver: true,
      friction: 8,
      tension: 120,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();
  }, [isScrollingDown, isTabBarVisible, translateY]);

  return (
    <Animated.View
      style={[
        styles.tabbar,
        {
          bottom: Math.max(insets.bottom, 15),
          transform: [{ translateY }],
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let label: string;

        if (typeof options.tabBarLabel === "string") {
          label = options.tabBarLabel;
        } else if (typeof options.title === "string") {
          label = options.title;
        } else {
          label = route.name;
        }

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        // Hide tab for create itinerary screen and any nested routes
        if (
          route.name.includes("create") ||
          route.name.includes("trips/create") ||
          route.name === "(main)/trips/create"
        ) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
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
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5,
    zIndex: 1000,
  },
});

export default TabBar;
