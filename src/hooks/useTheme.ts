import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type Theme = "light" | "dark";
export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "app-theme-mode";

export function useTheme() {
  // const systemTheme = useColorScheme() ?? "light";
  const [mode, setMode] = useState<ThemeMode>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  const theme: Theme = mode === "light" ? "light" : "dark";

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && ["light", "dark", "system"].includes(saved)) {
          setMode(saved as ThemeMode);
        }
      } catch (error) {
        console.warn("Failed to load theme preference:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (newMode: ThemeMode) => {
    try {
      setMode(newMode);
      await AsyncStorage.setItem(STORAGE_KEY, newMode);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  };

  const toggleTheme = () => {
    const modes: ThemeMode[] = ["light", "dark"];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setTheme(modes[nextIndex]);
  };

  const getThemeClasses = (lightClass: string, darkClass: string) => {
    return theme === "dark" ? darkClass : lightClass;
  };

  const colors = {
    background: theme === "dark" ? "bg-gray-900" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    surface: theme === "dark" ? "bg-gray-800" : "bg-gray-50",
    border: theme === "dark" ? "border-gray-700" : "border-gray-200",
    primary: theme === "dark" ? "bg-blue-600" : "bg-blue-500",
    primaryText: "text-white",
    // theme specific colors
    // primaryColor: '#E95D77',
    primaryColor: theme === "dark" ? "#F58601" : "#E95D77",
    secondaryColor: "#F58601",
    tertiaryColor: "#00C5A7",
    quaternaryColor: "#FFAD9F",
    // simple colors
    greyColor: "#737373",
    greyColorLight: "#9CA3AF",

    // text
    textPrimary: theme === "dark" ? "#FFFFFF" : "#4B5563",
  };

  return {
    theme,
    mode,
    setTheme,
    toggleTheme,
    isLoaded,
    isDark: theme === "dark",
    getThemeClasses,
    colors,
  };
}
