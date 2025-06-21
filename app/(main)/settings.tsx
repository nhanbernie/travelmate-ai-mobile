import { View, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: isDark ? 'white' : 'black' }}>Haha</Text>
      </View>
    </SafeAreaView>
  );
}
