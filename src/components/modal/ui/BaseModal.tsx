import React, { useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { ModalPosition, ModalSize } from '../types';
import { getAnimationConfig, BACKDROP_OPACITY } from '../utils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('screen');

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
  const positionStyle = useMemo(() => {
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
  }, [position]);

  const sizeStyle = useMemo(() => {
    const baseStyle = {
      backgroundColor: 'white',
      borderRadius: 30,
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
  }, [size]);

  const modalStyle = useMemo(() => {
    return { margin: 0 };
  }, [size]);

  // Chọn animation dựa trên vị trí để mượt mà hơn
  const getAnimations = () => {
    switch (position) {
      case 'top':
        return {
          animationIn: 'slideInDown' as const,
          animationOut: 'slideOutUp' as const,
        };
      case 'bottom':
        return {
          animationIn: 'slideInUp' as const,
          animationOut: 'slideOutDown' as const,
        };
      case 'center':
      default:
        return {
          animationIn: 'zoomIn' as const,
          animationOut: 'zoomOut' as const,
        };
    }
  };

  const { animationIn, animationOut } = getAnimations();
  const animationConfig = getAnimationConfig();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={BACKDROP_OPACITY}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationConfig.animationInTiming}
      animationOutTiming={animationConfig.animationOutTiming}
      backdropTransitionInTiming={animationConfig.backdropTransitionInTiming}
      backdropTransitionOutTiming={animationConfig.backdropTransitionOutTiming}
      style={modalStyle}
      useNativeDriverForBackdrop={animationConfig.useNativeDriver}
      useNativeDriver={animationConfig.useNativeDriver}
      hideModalContentWhileAnimating={
        animationConfig.hideModalContentWhileAnimating
      }
      avoidKeyboard={true}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
    >
      <View style={[styles.container, positionStyle]}>
        <View style={sizeStyle}>{children}</View>
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
