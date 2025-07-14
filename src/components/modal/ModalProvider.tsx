import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ModalConfig, ModalContextValue } from './types';

// Tạo context
const ModalContext = createContext<ModalContextValue | null>(null);

// Custom hook để sử dụng modal context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
};

// Provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  // Hiển thị modal mới
  const showModal = useCallback((config: Omit<ModalConfig, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newModal = { ...config, id } as ModalConfig;

    setModals((prev) => [...prev, newModal]);
    return id;
  }, []);

  // Ẩn modal theo ID
  const hideModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  // Ẩn tất cả modal
  const hideAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const value: ModalContextValue = {
    modals,
    showModal,
    hideModal,
    hideAllModals,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
