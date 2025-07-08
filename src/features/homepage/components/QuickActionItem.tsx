import { View } from 'react-native';
import { AppButton } from '@/components/ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const QuickActionItem = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const QUICK_ACTIONS: {
    title: string;
    icon: IoniconName;
    color: string;
    route?: string;
  }[] = [
    {
      title: 'Create Trip',
      icon: 'add',
      color: colors.primaryColor,
      route: '/trips',
    },
    {
      title: 'Explore',
      icon: 'compass',
      color: colors.secondaryColor,
      route: '/explore',
    },
    {
      title: 'My Places',
      icon: 'location-outline',
      color: colors.tertiaryColor,
      route: '/trips',
    },
    {
      title: 'Settings',
      icon: 'settings-outline',
      color: colors.quaternaryColor,
      route: '/profile',
    },
  ];

  const handlePress = (route: string | undefined) => {
    if (route) {
      router.push(route as any);
    } else {
      // what need to handle
    }
  };
  return (
    <View className="flex-row flex-wrap gap-4">
      {QUICK_ACTIONS.map((action) => (
        <View key={action.title} className="w-[47%]">
          <AppButton
            title={action.title}
            onPress={() => handlePress(action.route)}
            className="bg-white border border-[#F3F4F6] rounded-3xl w-full"
            classNameButton="p-2"
            textClassName="text-[#1F2937]"
            startIcon={
              <View
                className="flex-row items-center justify-center rounded-full p-3"
                style={{ backgroundColor: action.color }}
              >
                <Ionicons name={action.icon} size={20} color="white" />
              </View>
            }
          />
        </View>
      ))}
    </View>
  );
};

export default QuickActionItem;
