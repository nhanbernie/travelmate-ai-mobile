import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Theme, ThemeMode } from '@/hooks/useTheme';
interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => void;
  isDark: boolean;
  isLoaded: boolean;
  colors: {
    background: string;
    text: string;
    textSecondary: string;
    surface: string;
    border: string;
    primary: string;
    primaryText: string;
  };
  getThemeClasses: (lightClass: string, darkClass: string) => string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeData = useTheme();

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
