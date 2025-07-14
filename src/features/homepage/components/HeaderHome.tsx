import React from 'react';
import Header from '@/components/layouts/Header';
import { useModal } from '@/components/modal';
import { useAuth } from '@/contexts/AuthContext';
import ProfileModal from './ProfileModal';
const HeaderHome = () => {
  const { logout } = useAuth();
  const { showConfirm, hideAllModals } = useModal();

  const handleLogout = () => {
    hideAllModals();
    showConfirm({
      hideCancel: false,
      hideConfirm: false,
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      position: 'center',
      variant: 'default',
      onConfirm: () => {
        logout();
      },
    });
  };
  const handleOpenAvatarModal = () => {
    showConfirm({
      message: 'Are you sure you want to proceed?',
      position: 'center',
      variant: 'default',
      children: <ProfileModal handleLogout={handleLogout} />,
    });
  };
  return <Header onPressAvatar={handleOpenAvatarModal} />;
};

export default HeaderHome;
