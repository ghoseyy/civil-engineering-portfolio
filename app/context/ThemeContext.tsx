'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  name: string;
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#7c3aed',
    secondary: '#4f46e5',
    accent: '#3b82f6',
  },
  name: 'Sandhya Thapa'
};

export interface ThemeContextType {
  colors: ThemeColors;
  name: string;
  updateTheme: (newConfig: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: defaultTheme.colors,
  name: defaultTheme.name,
  updateTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultTheme);

  const applyTheme = (config: ThemeConfig) => {
    document.documentElement.style.setProperty('--color-primary', config.colors.primary);
    document.documentElement.style.setProperty('--color-secondary', config.colors.secondary);
    document.documentElement.style.setProperty('--color-accent', config.colors.accent);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        if (parsedTheme.colors && parsedTheme.name) {
          setThemeConfig(parsedTheme);
          applyTheme(parsedTheme);
        }
      } catch (error) {
        console.error('Error parsing theme from localStorage:', error);
      }
    } else {
      applyTheme(defaultTheme);
    }
  }, []);

  const updateTheme = (newConfig: ThemeConfig) => {
    setThemeConfig(newConfig);
    applyTheme(newConfig);
    localStorage.setItem('theme', JSON.stringify(newConfig));
  };

  return (
    <ThemeContext.Provider value={{ 
      colors: themeConfig.colors, 
      name: themeConfig.name, 
      updateTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 