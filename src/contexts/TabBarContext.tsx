import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabBarContextType {
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
}

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export const useTabBarContext = () => {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error('useTabBarContext must be used within a TabBarProvider');
  }
  return context;
};

interface TabBarProviderProps {
  children: ReactNode;
}

export const TabBarProvider: React.FC<TabBarProviderProps> = ({ children }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const setTabBarVisible = (visible: boolean) => {
    setIsTabBarVisible(visible);
  };

  return (
    <TabBarContext.Provider value={{ isTabBarVisible, setTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};
