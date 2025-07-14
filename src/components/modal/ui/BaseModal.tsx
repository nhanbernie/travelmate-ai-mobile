import React, { useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { ModalPosition, ModalSize } from '../types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  position?: ModalPosition;
  size?: ModalSize;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isVisible,
  onClose,
  position = 'center',
  size = 'md',
  children,
}) => {
  // Xác định style cho vị trí
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return {
          justifyContent: 'flex-start' as const,
          alignItems: 'center' as const,
          paddingTop: 64,
        };
      case 'bottom':
        return {
          justifyContent: 'flex-end' as const,
          alignItems: 'center' as const,
          paddingBottom: 32,
        };
      case 'center':
      default:
        return {
          justifyContent: 'center' as const,
          alignItems: 'center' as const,
        };
    }
  };

  // Xác định style cho kích thước
  const getSizeStyle = () => {
    const baseStyle = {
      backgroundColor: 'white',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    };

    switch (size) {
      case 'sm':
        return { ...baseStyle, width: screenWidth * 0.75, maxWidth: 300 };
      case 'md':
        return { ...baseStyle, width: screenWidth * 0.9, maxWidth: 400 };
      case 'lg':
        return { ...baseStyle, width: screenWidth * 0.9, maxWidth: 500 };
      case 'xl':
        return { ...baseStyle, width: screenWidth * 0.9, maxWidth: 600 };
      case 'full':
        return {
          ...baseStyle,
          width: screenWidth,
          height: screenHeight,
          borderRadius: 0,
        };
      default:
        return { ...baseStyle, width: screenWidth * 0.9, maxWidth: 400 };
    }
  };

  const getModalStyle = () => {
    if (size === 'full') {
      return { margin: 0 };
    }
    return {};
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={getModalStyle()}
      useNativeDriverForBackdrop
    >
      <View style={[styles.container, getPositionStyle()]}>
        <View style={getSizeStyle()}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BaseModal;
