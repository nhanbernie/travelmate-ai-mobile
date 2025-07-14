import { ReactNode } from 'react';

// Các loại modal
export type ModalType = 'Information' | 'Confirm';

// Loại thông báo cho Information modal
export type InformationType = 'success' | 'error' | 'info' | 'warning';

// Vị trí hiển thị modal
export type ModalPosition = 'center' | 'top' | 'bottom';

// Kích thước modal
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Base props cho tất cả modal
export interface BaseModalConfig {
  id: string;
  position?: ModalPosition;
  size?: ModalSize;
  onClose?: () => void;
}

// Props cho Information Modal
export interface InformationModalConfig extends BaseModalConfig {
  type: 'Information';
  variant: InformationType;
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

// Props cho Confirm Modal
export interface ConfirmModalConfig extends BaseModalConfig {
  type: 'Confirm';
  title?: string;
  message?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  hideCancel?: boolean;
  hideConfirm?: boolean;
  variant?: 'default' | 'danger' | 'success';
}

// Union type cho tất cả modal configs
export type ModalConfig = InformationModalConfig | ConfirmModalConfig;

// Context type
export interface ModalContextValue {
  modals: ModalConfig[];
  showModal: (config: Omit<ModalConfig, 'id'>) => string;
  hideModal: (id: string) => void;
  hideAllModals: () => void;
}
