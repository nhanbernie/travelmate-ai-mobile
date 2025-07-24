import { LoggerConfig } from 'react-native-reanimated';

// Configure Reanimated logger to reduce warnings in development
export const configureReanimatedLogger = () => {
  if (__DEV__) {
    // Disable strict mode warnings for better development experience
    const loggerConfig: LoggerConfig = {
      strict: false, // Disable strict mode warnings
      level: 'warn', // Only show warnings and errors
    };

    // Apply logger configuration
    require('react-native-reanimated').configureReanimatedLogger(loggerConfig);
  }
};

// Animation configurations for better performance
export const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

export const TIMING_CONFIG = {
  duration: 300,
  easing: require('react-native-reanimated').Easing.bezier(0.25, 0.1, 0.25, 1),
};

// Safe animation wrapper to prevent render phase access
export const createSafeAnimatedStyle = (styleFunction: () => any) => {
  'worklet';
  return styleFunction();
};
