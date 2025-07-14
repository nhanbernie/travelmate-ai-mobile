import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseModal from './BaseModal';
import { InformationModalConfig, InformationType } from '../types';

interface InformationModalProps {
  config: InformationModalConfig;
  onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = React.memo(
  ({ config, onClose }) => {
    const {
      variant,
      title,
      message,
      buttonText = 'OK',
      onButtonPress,
      position,
      size,
    } = config;

    const handleButtonPress = () => {
      if (onButtonPress) {
        onButtonPress();
      }
      onClose();
    };

    // Xác định icon cho từng loại thông báo
    const getIcon = (type: InformationType) => {
      switch (type) {
        case 'success':
          return '✅';
        case 'error':
          return '❌';
        case 'warning':
          return '⚠️';
        case 'info':
        default:
          return 'ℹ️';
      }
    };

    // Xác định màu nút cho từng loại
    const getButtonColorHex = (type: InformationType) => {
      switch (type) {
        case 'success':
          return '#10B981';
        case 'error':
          return '#EF4444';
        case 'warning':
          return '#F59E0B';
        case 'info':
        default:
          return '#3B82F6';
      }
    };

    return (
      <BaseModal
        isVisible={true}
        onClose={onClose}
        position={position}
        size={size}
      >
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{getIcon(variant)}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            onPress={handleButtonPress}
            style={[
              styles.button,
              { backgroundColor: getButtonColorHex(variant) },
            ]}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </BaseModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default InformationModal;
