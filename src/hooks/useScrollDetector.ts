import { useCallback, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useScrollContext } from '@/contexts/ScrollContext';

/**
 * A custom hook that tracks scroll direction and updates the global scroll context
 * @param hideThreshold The minimum scroll distance to hide the TabBar (scrolling down)
 * @param showThreshold The minimum scroll distance to show the TabBar (scrolling up)
 * @returns An object containing the onScroll handler
 */
export const useScrollDetector = (hideThreshold = 15, showThreshold = 5) => {
  const { setIsScrollingDown, lastScrollY, setLastScrollY, isScrollingDown } =
    useScrollContext();

  const scrollTimeout = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const lastUpdateTime = useRef<number>(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      const currentTime = Date.now();
      const scrollDelta = currentScrollY - lastScrollY;

      // Xác định hướng scroll
      const scrollingDown = scrollDelta > 0;

      // Sử dụng threshold khác nhau cho ẩn và hiện
      const currentThreshold = scrollingDown ? hideThreshold : showThreshold;

      // Bỏ qua nếu scroll distance không đủ theo threshold tương ứng
      if (Math.abs(scrollDelta) < currentThreshold) {
        return;
      }

      // Debounce với thời gian khác nhau cho ẩn và hiện
      const debounceTime = scrollingDown ? 30 : 10; // Ẩn chậm hơn, hiện nhanh hơn
      if (currentTime - lastUpdateTime.current < debounceTime) {
        return;
      }

      // Chỉ cập nhật nếu hướng scroll thực sự thay đổi
      if (isScrollingDown !== scrollingDown) {
        setIsScrollingDown(scrollingDown);
        lastUpdateTime.current = currentTime;
      }

      setLastScrollY(currentScrollY);

      isScrollingRef.current = true;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Đặt timeout để reset trạng thái scroll sau khi dừng
      scrollTimeout.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150); // 150ms sau khi dừng scroll
    },
    [
      lastScrollY,
      setIsScrollingDown,
      setLastScrollY,
      hideThreshold,
      showThreshold,
      isScrollingDown,
    ]
  );

  return {
    scrollHandler: handleScroll,
    scrollEventThrottle: 8, // Giảm throttle để phản hồi nhanh hơn (120fps)
  };
};
