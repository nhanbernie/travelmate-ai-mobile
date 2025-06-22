import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 bg-white dark:bg-gray-900`}
      edges={['left', 'right']}
    >
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
