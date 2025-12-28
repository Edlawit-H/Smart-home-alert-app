import React, { createContext, useContext, useState } from 'react';

export const Colors = {
  dark: {
    background: '#0f172a',
    card: '#1e293b',
    text: '#ffffff',
    subtext: '#94a3b8',
    border: '#334155',
    primary: '#3b82f6',
    error: '#ef4444',
    success: '#4ade80',
  },
  light: {
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    subtext: '#64748b',
    border: '#e2e8f0',
    primary: '#2563eb',
    error: '#dc2626',
    success: '#16a34a',
  }
};

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);