import React, { useState, forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps, Pressable } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { AppText } from '../ui/AppText';
import { cn } from '../../utils/cn';
import Ionicons from '@expo/vector-icons/Ionicons';

interface TextFieldProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'secureTextEntry'> {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ name, label, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { control } = useFormContext();
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    });

    const getKeyboardType = () => {
      switch (type) {
        case 'email':
          return 'email-address';
        case 'number':
          return 'numeric';
        default:
          return 'default';
      }
    };

    const getSecureTextEntry = () => {
      return type === 'password' && !showPassword;
    };

    const getAutoCapitalize = () => {
      if (type === 'email' || type === 'password') {
        return 'none';
      }
      return 'sentences';
    };
    return (
      <View className="w-full mb-4">
        {label && (
          <AppText variant="label" className="mb-2 ml-1">
            {label}
          </AppText>
        )}

        <View className="relative w-full">
          <TextInput
            ref={ref}
            className={cn(
              'w-full border rounded-xl px-4 py-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 text-base leading-5',
              error
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400',
              type === 'password' && 'pr-12'
            )}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType={getKeyboardType()}
            secureTextEntry={getSecureTextEntry()}
            autoCapitalize={getAutoCapitalize()}
            autoCorrect={type === 'password' || type === 'email' ? false : true}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
          {type === 'password' && (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#6B7280"
              />
            </Pressable>
          )}
        </View>

        {error && (
          <AppText variant="error" className="mt-2 ml-1">
            {error.message}
          </AppText>
        )}
      </View>
    );
  }
);

TextField.displayName = 'TextField';
