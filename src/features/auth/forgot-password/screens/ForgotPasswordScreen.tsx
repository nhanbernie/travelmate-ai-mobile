import React from "react";
import { View } from "react-native";
import AuthForm from "@/components/form/auth/AuthForm";
import { AppText } from "@/components/ui/AppText";
import useForgotPassword from "@/features/auth/forgot-password/hooks/useForgotPassword";
import { useTranslation } from "react-i18next";

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const handleForgotPassword = useForgotPassword();

  return (
    <View className="flex-1 w-full justify-center px-6 py-8">
      <View className="mb-8">
        <AppText variant="h1" className="text-center text-[#E95D77] mb-2 font-extrabold">
          {t("auth.forgotPassword.title")}
        </AppText>
        <AppText variant="subtitle" className="text-center">
          {t("auth.forgotPassword.subtitle")}
        </AppText>
      </View>
      <View className="w-full">
        <AuthForm type="forgotPassword" onSubmit={handleForgotPassword} />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
