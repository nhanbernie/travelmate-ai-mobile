import React from 'react';
import { Text, TextProps } from 'react-native';
import { createTextVariant, fontWeights } from '@/utils/textVariants';
import { type ClassValue } from 'clsx';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'bodyLarge'
  | 'bodySmall'
  | 'caption'
  | 'overline'
  | 'label'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

type TextWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

interface AppTextProps extends Omit<TextProps, 'className'> {
  variant?: TextVariant;
  weight?: TextWeight;
  className?: ClassValue;
  children: React.ReactNode;
}

export function AppText({
  variant = 'body',
  weight = 'normal',
  className,
  children,
  ...props
}: AppTextProps) {
  const customWeight = weight !== 'normal' ? fontWeights[weight] : undefined;
  const combinedClassName = createTextVariant(variant, customWeight, className);

  return (
    <Text className={combinedClassName} {...props}>
      {children}
    </Text>
  );
}
