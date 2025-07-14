import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BaseModal from './BaseModal';
import { InformationModalConfig, InformationType } from '../types';
import Ionicons from '@expo/vector-icons/Ionicons';

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

    const getIcon = (type: InformationType) => {
      switch (type) {
        case 'success':
          return 'checkmark-circle';
        case 'error':
          return 'close-circle';
        case 'warning':
          return 'warning';
        case 'info':
        default:
          return 'information-circle';
      }
    };

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
        <View className="p-6 items-center">
          <View className="mb-4">
            <Ionicons
              name={getIcon(variant)}
              color={getButtonColorHex(variant)}
              size={36}
            />
          </View>

          <Text className="text-lg font-bold text-gray-800 text-center mb-2">
            {title}
          </Text>

          <Text className="text-base text-gray-500 text-center mb-6">
            {message}
          </Text>

          <TouchableOpacity
            onPress={handleButtonPress}
            style={{ backgroundColor: getButtonColorHex(variant) }}
            className="px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold text-base">
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </BaseModal>
    );
  }
);

export default InformationModal;
