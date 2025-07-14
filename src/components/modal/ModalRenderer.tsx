import React, { useCallback, useMemo } from 'react';
import { useModalContext } from './ModalProvider';
import InformationModal from './ui/InformationModal';
import ConfirmModal from './ui/ConfirmModal';

const ModalRenderer: React.FC = () => {
  const { modals, hideModal } = useModalContext();

  // Memoize current modal để tránh re-render
  const currentModal = useMemo(() => modals[0], [modals]);

  // Memoize handleClose để tránh re-creation
  const handleClose = useCallback(() => {
    if (currentModal?.onClose) {
      currentModal.onClose();
    }
    if (currentModal?.id) {
      hideModal(currentModal.id);
    }
  }, [currentModal?.id, currentModal?.onClose, hideModal]);

  // Memoize modal component để tránh re-render - LUÔN gọi useMemo
  const modalComponent = useMemo(() => {
    if (!currentModal) {
      return null;
    }

    switch (currentModal.type) {
      case 'Information':
        return <InformationModal config={currentModal} onClose={handleClose} />;
      case 'Confirm':
        return <ConfirmModal config={currentModal} onClose={handleClose} />;
      default:
        return null;
    }
  }, [currentModal, handleClose]);

  return modalComponent;
};

export default ModalRenderer;
