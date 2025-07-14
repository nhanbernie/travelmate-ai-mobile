import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
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
    const id = `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newModal = { ...config, id } as ModalConfig;

    setModals((prev) => [...prev, newModal]);
    return id;
  }, []);

  // Ẩn modal theo ID với animation delay
  const hideModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  // Ẩn tất cả modal
  const hideAllModals = useCallback(() => {
    setModals([]);
  }, []);

  // Memoize context value để tránh re-render
  const contextValue = useMemo(
    () => ({
      modals,
      showModal,
      hideModal,
      hideAllModals,
    }),
    [modals, showModal, hideModal, hideAllModals]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
