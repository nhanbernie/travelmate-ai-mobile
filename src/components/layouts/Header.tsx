import { View, Text } from 'react-native';
import { AppText, Avatar } from '../ui';
import { useTheme } from '@/hooks/useTheme';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors/auth.selectors';
import { useTranslation } from 'react-i18next';
import SafeLanguageSwitcher from '../ui/SafeLanguageSwitcher';
interface HeaderProps {
  onPressAvatar?: () => void;
}
const Header = ({ onPressAvatar }: HeaderProps) => {
  const { colors } = useTheme();
  const user = useSelector(selectUser);
  const { t } = useTranslation();

  return (
    <View className="flex-row px-6 py-5 justify-between items-start">
      <View className="flex-col flex-1 pr-4">
        <View className="mb-3">
          <AppText
            variant="h2"
            className={`text-[${colors.primaryColor}]`}
            numberOfLines={2}
          >
            {t('homepage.header.welcomeBack', {
              username: user?.username || 'Traveler',
            })}
          </AppText>
        </View>
        <View>
          <AppText variant="title">
            {t('homepage.header.travelCompanion')}
          </AppText>
        </View>
      </View>
      <View className="flex-shrink-0">
        <Avatar onPress={onPressAvatar} />
      </View>
    </View>
  );
};

export default Header;
