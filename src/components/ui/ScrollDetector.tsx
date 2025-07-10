import React, { useRef } from 'react';
import {
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import { useScrollContext } from '@/contexts/ScrollContext';

interface ScrollDetectorProps {
  children: React.ReactNode;
  threshold?: number;
}

const ScrollDetector: React.FC<ScrollDetectorProps> = ({
  children,
  threshold = 5,
}) => {
  const { setIsScrollingDown, lastScrollY, setLastScrollY } =
    useScrollContext();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Determine scroll direction and update context if there's significant movement
    if (Math.abs(currentScrollY - lastScrollY) > threshold) {
      setIsScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    }
  };

  return (
    <View style={styles.container} onStartShouldSetResponder={() => true}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Only add onScroll and scrollEventThrottle if the child supports them
          const childProps: any = child.props || {};
          return React.cloneElement(child, {
            ...childProps,
            onScroll: handleScroll,
            scrollEventThrottle: 16, // For smooth tracking
          });
        }
        return child;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScrollDetector;
