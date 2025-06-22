import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" edges={['left', 'right']}>
      <LinearGradient
        colors={['#FEE7ED', '#FDF2F8', '#FFFFFF']}
        locations={[0, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};
