import { cn } from './cn';
import { type ClassValue } from 'clsx';

export interface TextVariantConfig {
  size: string;
  weight?: string;
  color: string;
  extras?: string;
}

export const textVariants: Record<string, TextVariantConfig> = {
  h1: {
    size: 'text-4xl',
    weight: 'font-bold',
    color: 'text-gray-900 dark:text-white',
  },
  h2: {
    size: 'text-3xl',
    weight: 'font-bold',
    color: 'text-gray-900 dark:text-white',
  },
  h3: {
    size: 'text-2xl',
    weight: 'font-semibold',
    color: 'text-gray-900 dark:text-white',
  },
  h4: {
    size: 'text-xl',
    weight: 'font-semibold',
    color: 'text-gray-900 dark:text-white',
  },
  title: {
    size: 'text-lg',
    weight: 'font-semibold',
    color: 'text-gray-900 dark:text-white',
  },
  subtitle: {
    size: 'text-base',
    weight: 'font-medium',
    color: 'text-gray-700 dark:text-gray-200',
  },
  body: {
    size: 'text-base',
    weight: 'font-normal',
    color: 'text-gray-900 dark:text-white',
  },
  bodyLarge: {
    size: 'text-lg',
    weight: 'font-normal',
    color: 'text-gray-900 dark:text-white',
  },
  bodySmall: {
    size: 'text-sm',
    weight: 'font-normal',
    color: 'text-gray-900 dark:text-white',
  },
  caption: {
    size: 'text-sm',
    weight: 'font-normal',
    color: 'text-gray-600 dark:text-gray-400',
  },
  overline: {
    size: 'text-xs',
    weight: 'font-normal',
    color: 'text-gray-500 dark:text-gray-500',
    extras: 'uppercase tracking-wide',
  },
  label: {
    size: 'text-sm',
    weight: 'font-medium',
    color: 'text-gray-700 dark:text-gray-300',
  },
  error: {
    size: 'text-sm',
    weight: 'font-normal',
    color: 'text-red-600 dark:text-red-400',
  },
  success: {
    size: 'text-sm',
    weight: 'font-normal',
    color: 'text-green-600 dark:text-green-400',
  },
  warning: {
    size: 'text-sm',
    weight: 'font-normal',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  info: {
    size: 'text-sm',
    weight: 'font-normal',
    color: 'text-blue-600 dark:text-blue-400',
  },
};

export const fontWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export function createTextVariant(
  variant: string,
  customWeight?: string,
  ...additionalClasses: ClassValue[]
): string {
  const config = textVariants[variant] || textVariants.body;
  const weight = customWeight || config.weight || '';

  return cn(
    config.size,
    weight,
    config.color,
    config.extras,
    ...additionalClasses
  );
}
