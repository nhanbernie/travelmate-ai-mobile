import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/layouts/ScreenWrapper ";
import { useScrollDetector } from "@/hooks/useScrollDetector";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui";
import { AppText } from "@/components/ui/AppText";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import LanguageTestScreen from "@/components/test/LanguageTestScreen";
import { useModal } from "@/components/modal";
import { useAuth } from "@/contexts/AuthContext";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useSafeNavigation();
  const { scrollHandler, scrollEventThrottle } = useScrollDetector(18, 7);
  const { showSuccess, showError, showWarning, showInfoMessage, showConfirm } = useModal();

  const handleTestAuth = () => {
    navigate("/(auth)/login");
  };

  // Test modal functions
  const handleTestSuccess = () => {
    showSuccess("Success!", "This is a success message");
  };

  const handleTestError = () => {
    showError("Error!", "This is an error message");
  };

  const handleTestWarning = () => {
    showWarning("Warning!", "This is a warning message");
  };

  const handleTestInfo = () => {
    showInfoMessage("Info", "This is an info message");
  };

  const handleTestConfirm = () => {
    showConfirm({
      title: "Confirm Action",
      message: "Are you sure you want to proceed?",
      onConfirm: () => {
        console.log("Confirmed!");
      },
      onCancel: () => {
        console.log("Cancelled!");
      },
    });
  };

  const handleTestConfirmWithCustomContent = () => {
    showConfirm({
      title: "Custom Content",
      children: (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            This is custom content with React components!
          </Text>
        </View>
      ),
      onConfirm: () => {
        console.log("Custom confirmed!");
      },
      variant: "danger",
      confirmText: "Delete",
      cancelText: "Keep",
      position: "top",
    });
  };

  const handleTestConfirmWithoutButtons = () => {
    showConfirm(); // Không truyền gì -> không có nút
  };

  const handleLogout = () => {
    handleTestAuth();
  };

  return (
    <ScreenWrapper>
      <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modal System Tests</Text>
            <Pressable style={styles.testButton} onPress={handleTestSuccess}>
              <Text style={styles.buttonText}>Test Success Modal</Text>
            </Pressable>
            <Pressable style={styles.testButton} onPress={handleTestError}>
              <Text style={styles.buttonText}>Test Error Modal</Text>
            </Pressable>
            <Pressable style={styles.testButton} onPress={handleTestWarning}>
              <Text style={styles.buttonText}>Test Warning Modal</Text>
            </Pressable>
            <Pressable style={styles.testButton} onPress={handleTestInfo}>
              <Text style={styles.buttonText}>Test Info Modal</Text>
            </Pressable>
            <Pressable style={styles.testButton} onPress={handleTestConfirm}>
              <Text style={styles.buttonText}>Test Confirm Modal</Text>
            </Pressable>
            <Pressable style={styles.testButton} onPress={handleTestConfirmWithCustomContent}>
              <Text style={styles.buttonText}>Test Custom Confirm Modal</Text>
            </Pressable>
            <Pressable style={styles.testButton} onPress={handleTestConfirmWithoutButtons}>
              <Text style={styles.buttonText}>Test Confirm Without Buttons</Text>
            </Pressable>
            <Pressable onPress={handleLogout} style={styles.testButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>

          <LanguageTestScreen />
        </View>
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
  section: {
    width: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F2937",
  },
  testButton: {
    backgroundColor: "#E95D77",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProfileScreen;
