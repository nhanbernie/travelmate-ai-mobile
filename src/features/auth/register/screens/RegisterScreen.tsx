import React from "react";
import { View } from "react-native";
import AuthForm from "@/components/form/auth/AuthForm";
import { AppText } from "@/components/ui/AppText";
import useRegisterSubmit from "@/features/auth/register/hooks/useRegister";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const handleRegister = useRegisterSubmit();

  return (
    <View className="flex-1 w-full justify-center px-6 py-8">
      <View className="mb-8">
        <AppText variant="h1" className="text-center text-[#E95D77] mb-2 font-extrabold">
          {t("auth.register.title")}
        </AppText>
        <AppText variant="subtitle" className="text-center text-[#4B5563]">
          {t("auth.register.subtitle")}
        </AppText>
      </View>

      <View className="w-full">
        <AuthForm type="register" onSubmit={handleRegister} />
      </View>
    </View>
  );
};

export default RegisterScreen;
