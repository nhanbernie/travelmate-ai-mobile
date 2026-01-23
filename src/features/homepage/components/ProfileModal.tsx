import { View } from "react-native";
import React from "react";
import { AppButton, AppText, Avatar } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useTheme } from "@/hooks/useTheme";

const ProfileModal = ({ handleLogout }: { handleLogout: () => void }) => {
  const { user } = useCurrentUser();
  const { colors } = useTheme();

  return (
    <View>
      <View className="flex items-center mb-4">
        <Avatar className="mb-4" size={80} avatarUrl={user?.avatar} />
        <AppText variant="h3" className="mb-1">
          {user?.firstName || "Traveler"}
        </AppText>
        <AppText variant="body" className="text-gray-500">
          {user?.email || ""}
        </AppText>
      </View>

      <AppButton
        title="Logout"
        textClassName="text-[#E95D77] font-semibold"
        className="bg-[#FEE7ED] rounded-2xl border-0"
        classNameButton="py-3"
        startIcon={<Ionicons name="log-out-outline" size={24} color="#E95D77" />}
        onPress={handleLogout}
      />
    </View>
  );
};

export default ProfileModal;
