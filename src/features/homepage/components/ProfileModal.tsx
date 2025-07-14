import { View } from 'react-native';
import React from 'react';
import { AppButton, AppText, Avatar } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
const ProfileModal = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <View className="">
      <View className="flex items-center mb-6">
        <Avatar className="mb-3" size={70} />
        <AppText variant="h4">John Doe</AppText>
        <AppText variant="body" className="text-gray-500">
          john.doe@example.com
        </AppText>
      </View>
      <AppButton
        title="Logout"
        textClassName="text-red-600"
        className="rounded-xl"
        startIcon={
          <Ionicons name="log-out-outline" size={24} color="#E95D77" />
        }
        onPress={handleLogout}
      />
    </View>
  );
};

export default ProfileModal;
