'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  getPreferredTheme,
  persistTheme,
  type Theme,
} from '@/lib/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const setThemeMode = useCallback((next: Theme) => {
    persistTheme(next);
    applyTheme(next);
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(theme === 'dark' ? 'light' : 'dark');
  }, [setThemeMode, theme]);

  return {
    theme,
    isDark: theme === 'dark',
    mounted,
    setTheme: setThemeMode,
    toggleTheme,
  };
}
