'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { isDark, mounted, toggleTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex items-center gap-2 rounded-lg px-2 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        <Moon size={17} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="flex items-center gap-2 rounded-lg px-2 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
      <span className="hidden text-xs font-semibold sm:inline">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
