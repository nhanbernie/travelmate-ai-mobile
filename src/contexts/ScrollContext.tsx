import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollContextType {
  isScrollingDown: boolean;
  setIsScrollingDown: (isScrollingDown: boolean) => void;
  lastScrollY: number;
  setLastScrollY: (lastScrollY: number) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
}

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const updateScrollingDown = (newValue: boolean) => {
    setIsScrollingDown((prev) => {
      if (prev !== newValue) {
        return newValue;
      }
      return prev;
    });
  };

  const value = {
    isScrollingDown,
    setIsScrollingDown: updateScrollingDown,
    lastScrollY,
    setLastScrollY,
  };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
