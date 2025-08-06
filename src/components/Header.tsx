import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { logout } = useAuth();

  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-blue-500">
      <Text className="text-white text-lg font-bold">Schedoryn</Text>
      <TouchableOpacity
        onPress={logout}
        className="bg-red-500 px-3 py-1 rounded"
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
