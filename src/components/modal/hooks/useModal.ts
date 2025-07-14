import { useModalContext } from '../ModalProvider';
import { ModalConfig, InformationType } from '../types';

export const useModal = () => {
  const { showModal, hideModal, hideAllModals } = useModalContext();

  // Hiển thị Information Modal
  const showInfo = (config: {
    variant: InformationType;
    title: string;
    message: string;
    buttonText?: string;
    onButtonPress?: () => void;
    position?: 'center' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  }) => {
    return showModal({
      type: 'Information',
      ...config,
    });
  };

  // Hiển thị Confirm Modal
  const showConfirm = (
    config: {
      title?: string;
      message?: string;
      children?: React.ReactNode;
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
      onCancel?: () => void;
      hideCancel?: boolean;
      hideConfirm?: boolean;
      variant?: 'default' | 'danger' | 'success';
      position?: 'center' | 'top' | 'bottom';
      size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    } = {}
  ) => {
    return showModal({
      type: 'Confirm',
      title: '',
      hideCancel: true,
      hideConfirm: true,
      ...config,
    });
  };

  // Các helper methods cho từng loại thông báo
  const showSuccess = (title: string, message: string, buttonText?: string) => {
    return showInfo({
      variant: 'success',
      title,
      message,
      buttonText,
    });
  };

  const showError = (title: string, message: string, buttonText?: string) => {
    return showInfo({
      variant: 'error',
      title,
      message,
      buttonText,
    });
  };

  const showWarning = (title: string, message: string, buttonText?: string) => {
    return showInfo({
      variant: 'warning',
      title,
      message,
      buttonText,
    });
  };

  const showInfoMessage = (
    title: string,
    message: string,
    buttonText?: string
  ) => {
    return showInfo({
      variant: 'info',
      title,
      message,
      buttonText,
    });
  };

  return {
    showModal,
    showInfo,
    showConfirm,
    showSuccess,
    showError,
    showWarning,
    showInfoMessage,
    hideModal,
    hideAllModals,
  };
};
