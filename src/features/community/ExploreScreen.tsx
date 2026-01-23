import ScreenWrapper from "@/components/layouts/ScreenWrapper ";
import { ScrollView, View } from "react-native";
import { useScrollDetector } from "@/hooks/useScrollDetector";
import { useState } from "react";
import EmptyExplore from "./components/EmptyExplore";

const ExploreScreen = () => {
  const { scrollHandler, scrollEventThrottle } = useScrollDetector();

  // TODO: Replace with real data fetching
  const [exploreData, setExploreData] = useState<any[]>([]);
  const isEmpty = exploreData.length === 0;

  return (
    <ScreenWrapper>
      <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <EmptyExplore />
        ) : (
          <View className="p-5">
            {/* TODO: Render actual explore content here when data is available */}
            {exploreData.map((item, index) => (
              <View key={index}>{/* Explore item component */}</View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ExploreScreen;
