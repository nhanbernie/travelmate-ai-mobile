import React from "react";
import { View } from "react-native";
import AuthForm from "@/components/form/auth/AuthForm";
import { AppText } from "@/components/ui/AppText";
import useVerifyOTP from "@/features/auth/forgot-password/hooks/useVerifyOTP";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

const VerifyOTPScreen = () => {
  const { t } = useTranslation();
  const { email } = useLocalSearchParams<{ email: string }>();
  const verifyOTP = useVerifyOTP();

  return (
    <View className="flex-1 w-full justify-center px-6 py-8">
      <View className="mb-8">
        <AppText variant="h1" className="text-center text-[#E95D77] mb-2">
          {t("auth.verifyOtp.title")}
        </AppText>
        <AppText variant="subtitle" className="text-center">
          {t("auth.verifyOtp.subtitle")}
        </AppText>
      </View>

      <View className="w-full">
        <AuthForm email={email} type="verifyOTP" onSubmit={verifyOTP} />
      </View>
    </View>
  );
};

export default VerifyOTPScreen;
