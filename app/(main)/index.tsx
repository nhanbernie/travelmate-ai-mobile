import { View, Text, ScrollView } from 'react-native';
// import { Header } from '@/components/Header';
import Header from '@/components/layouts/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import Homepage from '@/features/homepage/Homepage';
const App = () => {
  return <Homepage />;
};

export default App;
