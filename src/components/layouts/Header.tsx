import { View, Text } from 'react-native';
import { AppText, Avatar } from '../ui';
import { useTheme } from '@/hooks/useTheme';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors/auth.selectors';
const Header = () => {
  const { colors } = useTheme();
  const user = useSelector(selectUser);
  return (
    <View className="flex-row px-6 py-5">
      <View className="flex-col">
        <View className='mb-3'>
          <AppText variant="h2" className={`text-[${colors.primaryColor}]`}>
            Welcome back, {user?.username || 'Traveler'}!
          </AppText>
        </View>
        <View>
          <AppText variant="title">Your travel companion</AppText>
        </View>
      </View>
      <View className='absolute right-6 top-6'>
        <Avatar />
      </View>
    </View>
  );
};

export default Header;
