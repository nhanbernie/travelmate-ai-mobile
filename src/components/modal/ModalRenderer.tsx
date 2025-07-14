import React from 'react';
import { useModalContext } from './ModalProvider';
import InformationModal from './ui/InformationModal';
import ConfirmModal from './ui/ConfirmModal';

const ModalRenderer: React.FC = () => {
  const { modals, hideModal } = useModalContext();

  // Chỉ hiển thị modal đầu tiên trong queue
  const currentModal = modals[0];

  if (!currentModal) {
    return null;
  }

  const handleClose = () => {
    if (currentModal.onClose) {
      currentModal.onClose();
    }
    hideModal(currentModal.id);
  };

  switch (currentModal.type) {
    case 'Information':
      return <InformationModal config={currentModal} onClose={handleClose} />;
    case 'Confirm':
      return <ConfirmModal config={currentModal} onClose={handleClose} />;
    default:
      return null;
  }
};

export default ModalRenderer;
