import TabBar from '@/components/tabs/TabBar';
import { Tabs } from 'expo-router';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
export default function MainLayout() {
  return (
    <ScreenWrapper>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            title: 'Trips',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
    </ScreenWrapper>
  );
}
