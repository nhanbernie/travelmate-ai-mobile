import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onValueChange: (date: Date | null) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  error?: string;
  style?: object;
  textStyle?: object;
  containerStyle?: object;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onValueChange,
  placeholder = 'Date Picker',
  minimumDate,
  maximumDate,
  disabled = false,
  error,
  style,
  textStyle,
  containerStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handlePress = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value;
    setShowPicker(Platform.OS === 'ios');

    if (event.type === 'set' && currentDate) {
      onValueChange(currentDate);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          style,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.inputText,
            !value && styles.placeholderText,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {formatDate(value)}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={disabled ? '#ccc' : error ? '#f44336' : '#666'}
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#f44336',
    backgroundColor: '#fef2f2',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  disabledText: {
    color: '#ccc',
  },
  errorText: {
    fontSize: 14,
    color: '#f44336',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default DatePicker;
