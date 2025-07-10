import TabBar from '@/components/tabs/TabBar';
import { Tabs } from 'expo-router';
import { ScrollProvider } from '@/contexts/ScrollContext';

export default function MainLayout() {
  return (
    <ScrollProvider>
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
          name="trips"
          options={{
            title: 'Trips',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
    </ScrollProvider>
  );
}
