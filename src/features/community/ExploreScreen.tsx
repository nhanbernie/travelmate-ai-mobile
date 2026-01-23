import ScreenWrapper from "@/components/layouts/ScreenWrapper ";
import { Text, ScrollView, StyleSheet } from "react-native";
import { useScrollDetector } from "@/hooks/useScrollDetector";

const ExploreScreen = () => {
  const { scrollHandler, scrollEventThrottle } = useScrollDetector();
  
  return (
    <ScreenWrapper>
      <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Explore</Text>

        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Text key={i} style={styles.dummyText}>
              Explore content item {i + 1}
            </Text>
          ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dummyText: {
    fontSize: 16,
    marginVertical: 8,
    color: "#666",
  },
});

export default ExploreScreen;
