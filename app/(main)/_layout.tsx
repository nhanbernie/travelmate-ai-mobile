import TabBar from '@/components/tabs/TabBar';
import { Tabs } from 'expo-router';
import { ScrollProvider } from '@/contexts/ScrollContext';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {
  const { t } = useTranslation();
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
            title: t('tabs.home'),
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            title: t('tabs.trips'),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: t('tabs.explore'),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('tabs.profile'),
          }}
        />
      </Tabs>
    </ScrollProvider>
  );
}
