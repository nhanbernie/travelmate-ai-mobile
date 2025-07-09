import { View, Text } from 'react-native';
import React from 'react';
import { AppText, RoundedIcon } from '@/components/ui';
const RecentActivities = () => {
  return (
    <View className="flex-1">
      <AppText variant="h4">Recent Activities</AppText>
      <View className="mt-4">
        {/* <Text className="text-gray-500">No recent activities found.</Text> */}
        <View className="flex-row items-center justify-start mb-5">
          <RoundedIcon
            iconName="airplane-outline"
            size={24}
            colorIcon="#E95D77"
            classNameRounded="bg-white"
          />
          <View className="flex-col ml-5">
            <AppText variant="title">Flight to Paris</AppText>
            <AppText variant="body" className="text-gray-500">
              2 hours ago
            </AppText>
          </View>
        </View>

        <View className="flex-row items-center justify-start mb-5">
          <RoundedIcon
            iconName="battery-dead"
            size={24}
            colorIcon="#E95D77"
            classNameRounded="bg-white"
          />
          <View className="flex-col ml-5">
            <AppText variant="title">Flight to Paris</AppText>
            <AppText variant="body" className="text-gray-500">
              2 hours ago
            </AppText>
          </View>
        </View>

        <View className="flex-row items-center justify-start mb-5">
          <RoundedIcon
            iconName="ticket-outline"
            size={24}
            colorIcon="#E95D77"
            classNameRounded="bg-white"
          />
          <View className="flex-col ml-5">
            <AppText variant="title">Flight to Paris</AppText>
            <AppText variant="body" className="text-gray-500">
              2 hours ago
            </AppText>
          </View>
        </View>

        <View className="flex-row items-center justify-start mb-5">
          <RoundedIcon
            iconName="airplane-outline"
            size={24}
            colorIcon="#E95D77"
            classNameRounded="bg-white"
          />
          <View className="flex-col ml-5">
            <AppText variant="title">Flight to Paris</AppText>
            <AppText variant="body" className="text-gray-500">
              2 hours ago
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentActivities;
