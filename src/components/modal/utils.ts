import { Platform } from 'react-native';

// Tối ưu animation config cho từng platform
export const ANIMATION_CONFIG = {
  ios: {
    animationInTiming: 300,
    animationOutTiming: 250,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 250,
    useNativeDriver: true,
    hideModalContentWhileAnimating: true,
  },
  android: {
    animationInTiming: 250,
    animationOutTiming: 200,
    backdropTransitionInTiming: 250,
    backdropTransitionOutTiming: 200,
    useNativeDriver: true,
    hideModalContentWhileAnimating: true,
  },
};

export const getAnimationConfig = () => {
  return Platform.OS === 'ios'
    ? ANIMATION_CONFIG.ios
    : ANIMATION_CONFIG.android;
};

// Tối ưu backdrop opacity cho từng platform
export const BACKDROP_OPACITY = Platform.OS === 'ios' ? 0.4 : 0.3;

// Debounce function để tránh spam modal
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
