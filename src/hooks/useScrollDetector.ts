import { useCallback } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useScrollContext } from '@/contexts/ScrollContext';

/**
 * A custom hook that tracks scroll direction and updates the global scroll context
 * @param threshold The minimum scroll distance to trigger a direction change
 * @returns An object containing the onScroll handler
 */
export const useScrollDetector = (threshold = 5) => {
  const { setIsScrollingDown, lastScrollY, setLastScrollY } =
    useScrollContext();

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;

      // Determine scroll direction and update context if there's significant movement
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setIsScrollingDown(currentScrollY > lastScrollY);
        setLastScrollY(currentScrollY);
      }
    },
    [lastScrollY, setIsScrollingDown, setLastScrollY, threshold]
  );

  return {
    scrollHandler: handleScroll,
    scrollEventThrottle: 16, // For smooth tracking
  };
};
