import React from "react";
import Header from "@/components/layouts/Header";
import { useModal } from "@/components/modal";
import { useAuth } from "@/contexts/AuthContext";
import ProfileModal from "./ProfileModal";
import { useTranslation } from "react-i18next";

const HeaderHome = () => {
  const { logout } = useAuth();
  const { showConfirm, hideAllModals } = useModal();
  const { t } = useTranslation();

  const handleLogout = () => {
    hideAllModals();
    showConfirm({
      hideCancel: false,
      hideConfirm: false,
      title: t("profile.logoutConfirm"),
      message: t("profile.logoutMessage"),
      confirmText: t("profile.logout"),
      cancelText: t("common.cancel"),
      position: "center",
      variant: "danger",
      onConfirm: () => {
        logout();
      },
    });
  };
  const handleOpenAvatarModal = () => {
    showConfirm({
      message: "Are you sure you want to proceed?",
      position: "center",
      variant: "default",
      children: <ProfileModal handleLogout={handleLogout} />,
    });
  };
  return <Header onPressAvatar={handleOpenAvatarModal} />;
};

export default HeaderHome;
