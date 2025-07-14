import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseModal from './BaseModal';
import { ConfirmModalConfig } from '../types';

interface ConfirmModalProps {
  config: ConfirmModalConfig;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = React.memo(
  ({ config, onClose }) => {
    const {
      title,
      message,
      children,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      hideCancel = false,
      hideConfirm = false,
      variant = 'default',
      position,
      size,
    } = config;

    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      }
      onClose();
    };

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
      onClose();
    };

    // Xác định màu cho nút confirm theo variant
    const getConfirmButtonColor = () => {
      switch (variant) {
        case 'danger':
          return '#EF4444';
        case 'success':
          return '#10B981';
        case 'default':
        default:
          return '#3B82F6';
      }
    };

    return (
      <BaseModal
        isVisible={true}
        onClose={handleCancel}
        position={position}
        size={size}
      >
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}

          {children ? (
            <View style={styles.contentContainer}>{children}</View>
          ) : (
            message && <Text style={styles.message}>{message}</Text>
          )}

          {(!hideCancel || !hideConfirm) && (
            <View style={styles.buttonContainer}>
              {!hideCancel && (
                <TouchableOpacity
                  onPress={handleCancel}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}

              {!hideConfirm && (
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={[
                    styles.button,
                    styles.confirmButton,
                    { backgroundColor: getConfirmButtonColor() },
                  ]}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </BaseModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  contentContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ConfirmModal;
