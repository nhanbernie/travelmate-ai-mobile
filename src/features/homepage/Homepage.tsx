import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { Header } from '@/components/Header';
import Header from '@/components/layouts/Header';
import QuickActionItem from './components/QuickActionItem';
const Homepage = () => {
  return (
    <>
      <Header />
      <ScrollView>
        <View className="flex-1 px-6 py-4">
          <View className=''>
            <QuickActionItem />
          </View>
          {/* <View className="">
            <TouchableOpacity className="basis-1/2 p-2">
              <View className="w-full bg-blue-500 p-4 rounded-xl">
                <Text className="text-center text-white font-semibold">
                  Button 1
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="basis-1/2 p-2">
              <View className="w-full bg-green-500 p-4 rounded-xl">
                <Text className="text-center text-white font-semibold">
                  Button 2
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="basis-1/2 p-2">
              <View className="w-full bg-rose-500 p-4 rounded-xl">
                <Text className="text-center text-white font-semibold">
                  Button 3
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="basis-1/2 p-2">
              <View className="w-full bg-orange-500 p-4 rounded-xl">
                <Text className="text-center text-white font-semibold">
                  Button 4
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};

export default Homepage;
